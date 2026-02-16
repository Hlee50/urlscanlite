import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const body = req.body;

        const response = await fetch("https://urlscan.io/api/v1/scan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.API_KEY!,
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return res.status(response.status).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}