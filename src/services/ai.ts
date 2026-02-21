import { GoogleGenAI } from "@google/genai";

/**
 * Generates a virtual try-on image.
 * Combines a user's photo with the dress image.
 */
export async function generateTryOn(userImageBase64: string, dressImageUrl: string, dressDescription: string): Promise<string> {
  // Check for API key selection to avoid 403 errors
  const aistudio = (window as any).aistudio;
  if (aistudio && !await aistudio.hasSelectedApiKey()) {
      await aistudio.openSelectKey();
  }
  
  // Initialize AI with the (potentially updated) API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Fetch dress image
  let dressBase64 = '';
  try {
    const response = await fetch(dressImageUrl);
    const blob = await response.blob();
    dressBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    // Remove data:image/...;base64, prefix if present
    if (dressBase64.includes(',')) {
        dressBase64 = dressBase64.split(',')[1];
    }
  } catch (e) {
    console.error("Could not fetch dress image for context", e);
    throw new Error("Nu s-a putut accesa imaginea rochiei.");
  }

  // The first image part is the User, the second image part is the Dress.
  const prompt = `You are an expert digital tailor and fashion photographer.

  INPUTS:
  1. USER IMAGE (First image provided): Contains the person, their specific BODY STRUCTURE, POSE, and FACE.
  2. DRESS IMAGE (Second image provided): Contains the dress and the target SCENE/BACKGROUND.

  TASK:
  Generate a photorealistic image of the USER from Image 1 wearing the DRESS from Image 2.

  CRITICAL INSTRUCTIONS:
  - POSE & BODY: You MUST strictly respect the USER'S body structure and pose from Image 1. Do not change the user's pose.
  - FACE & IDENTITY: Preserve the USER'S face and identity exactly.
  - OUTFIT MORPHING: Adapt and drape the DRESS from Image 2 to fit the USER'S specific body shape and pose naturally. 
  - SCENE INTEGRATION: Place this generated person into the BACKGROUND of Image 2 (the dress image). 
  - LIGHTING: Relight the user to match the lighting environment of Image 2 perfectly.

  Output requirements: High fidelity, 8k resolution, photorealistic fashion photography.`;

  const parts: any[] = [
    { text: prompt },
    {
        inlineData: {
            mimeType: 'image/jpeg',
            data: userImageBase64.split(',')[1] // remove prefix
        }
    }
  ];

  if (dressBase64) {
      parts.push({
          inlineData: {
              mimeType: 'image/jpeg',
              data: dressBase64
          }
      });
  }

  try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: parts
        }
      });

      // Extract image
      let generatedImage = '';
      if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              generatedImage = `data:image/png;base64,${part.inlineData.data}`;
              break;
            }
          }
      }
      
      if (!generatedImage) {
          console.error("AI Response did not contain an image:", response);
          throw new Error("AI-ul nu a returnat nicio imagine. Este posibil ca imaginea să fi fost filtrată din motive de siguranță.");
      }

      return generatedImage;

  } catch (error: any) {
      console.error("Generate TryOn Error:", error);
      if (error.message && error.message.includes("403")) {
          throw new Error("Permisiune refuzată. Vă rugăm să verificați cheia API.");
      }
      throw error;
  }
}

/**
 * Generates a 360 rotation video of the dress.
 */
export async function generate360Video(dressImageUrl: string, dressName: string): Promise<string> {
    
    // Check for API key for Veo (requires user selection)
    const aistudio = (window as any).aistudio;
    if (aistudio && !await aistudio.hasSelectedApiKey()) {
        await aistudio.openSelectKey();
    }
    // Re-instantiate to ensure key is picked up if it was just selected
    const aiWithKey = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Fetch image to bytes
    const responseImg = await fetch(dressImageUrl);
    const blob = await responseImg.blob();
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    const imageBytes = base64.split(',')[1];

    try {
        let operation = await aiWithKey.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: `Cinematic 360 degree turntable shot of a fashion model wearing this ${dressName} dress. 
                    The model rotates slowly to show the front, side, and back of the dress.
                    Clean studio lighting, elegant atmosphere, pastel background. High resolution, photorealistic fashion videography.`,
            image: {
                imageBytes: imageBytes,
                mimeType: blob.type || 'image/jpeg',
            },
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '9:16' // Portrait for mobile-first feel
            }
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            operation = await aiWithKey.operations.getVideosOperation({operation: operation});
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) throw new Error("Video generation failed");

        // We must proxy this or fetch with key to play it
        const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
        const videoBlob = await videoResponse.blob();
        return URL.createObjectURL(videoBlob);
    } catch (error: any) {
        console.error("Video Generation Error:", error);
        throw new Error("Nu s-a putut genera videoclipul. Vă rugăm să încercați din nou.");
    }
}