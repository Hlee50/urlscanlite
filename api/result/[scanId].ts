import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    const scanId = req.query.scanId;

    const response = await fetch(`https://urlscan.io/api/v1/result/${scanId}`, {
        method: "GET",
        headers: {
            "api-key": process.env.API_KEY!,
        },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
}