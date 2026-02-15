import { Header } from '../components/Header'
import './ScanResult.css'

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

interface ScanResultProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    result: Result;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function ScanResult({ options, setOptions, visibility, setVisibility, result, setResult }: ScanResultProps) {
    return (
        <>
            <Header options={options} setOptions={setOptions}
                visibility={visibility} setVisibility={setVisibility}
                setResult={setResult} />

            {result === null && <div className="loading-container"><div className="loading"/></div>}

            {result && result.status >= 400 && "message" in result &&
                <p className="error">{result.message}<br />{result.description}</p>}

            {result && result.status === 200 && "url" in result &&
                <div className="scan-result">
                    <div className="summary">
                        <p><strong>URL: </strong>{result.url}</p>
                        <p><strong>Domain: </strong>{result.domain}</p>
                        <p><strong>IP Address:  </strong>{result.ip || 'Unknown'}</p>
                        <p>
                            <strong>Location: </strong>
                            {([result.city, result.country].filter(Boolean).join(', ') || 'Unknown')}
                        </p>
                    </div>
                    <img id="screenshot" src={result.screenshot} alt="Scan Screenshot" />
                </div>}
        </>
    );
}
