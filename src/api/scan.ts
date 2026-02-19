import axios from 'axios';
import { getIso3166CountryName } from "iso-3166-ts";

type Result = {
    status: 200;
    url: string;
    domain: string;
    ip: string;
    asnname: string;
    country: string;
    city: string;
    malicious: boolean;
    screenshot: string;
} | {
    status: number;
    message: string;
    description: string;
} | null;

export async function submitScan(scanUrl: string, visibility: string, setResult: React.Dispatch<React.SetStateAction<Result | null>>) {
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
                        asnname: response.data.page.asnname,
                        country: getIso3166CountryName(response.data.page.country) || response.data.page.country,
                        city: response.data.page.city,
                        malicious: response.data.verdicts.overall.malicious,
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