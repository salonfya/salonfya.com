import { put } from '@vercel/blob';

export const config = {
    runtime: 'edge', // Using Vercel Edge Runtime for faster uploads
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename') || 'untitled';

    try {
        // req.body is a ReadableStream which put() can accept directly in Edge runtime
        const blob = await put(filename, req.body!, {
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
