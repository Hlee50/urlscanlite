import axios from 'axios';

type Result = {
    status: 200;
    url: string;
    domain: string;
    ip: string;
    country: string;
    city: string;
    screenshot: string;
} | {
    status: number;
    message: string;
    description: string;
} | null;

export async function scan(scanUrl: string, visibility: string, setResult: React.Dispatch<React.SetStateAction<Result | null>>) {
    try {
        setResult(null);
        const country = visibility === "private" ? "" : "us";

        let response = await axios.post('/api/scan', {
            url: scanUrl,
            visibility: visibility,
            country: country
        });

        const uuid = response.data.uuid

        await new Promise(resolve => setTimeout(resolve, 10000));

        while (true) {
            try {
                response = await axios.get<Response>(`/api/result/${uuid}`);

                if (response.status === 200) {
                    setResult({
                        status: response.status,
                        url: response.data.page.url,
                        domain: response.data.page.domain,
                        ip: response.data.page.ip,
                        country: response.data.page.country,
                        city: response.data.page.city,
                        screenshot: `https://urlscan.io/screenshots/${uuid}.png`
                    });
                    return;
                }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    await new Promise(r => setTimeout(r, 2000));
                    continue;
                }
                throw error;
            }
        };

    } catch (error: any) {
        setResult({
            status: error.response.status,
            message: error.response.data.message,
            description: error.response.data.description
        });
    };
}