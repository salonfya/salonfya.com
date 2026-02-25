import { put } from '@vercel/blob';

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename') || 'untitled';

    try {
        const bodyContent = await req.arrayBuffer(); // Node environment fallback
        const blob = await put(filename, bodyContent, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return new Response(JSON.stringify(blob), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
