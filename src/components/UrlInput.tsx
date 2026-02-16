import { NavLink, useSearchParams } from 'react-router'
import { useState } from 'react'
import { submitScan } from '../api/scan'
import { Options } from './Options'
import magnifier from "../assets/images/iconmonstr-magnifier-2-240.png"
import './UrlInput.css'

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

interface UrlInputProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function UrlInput({ options, setOptions, visibility, setVisibility, setResult }: UrlInputProps) {
    const [searchParams] = useSearchParams();
    const [scanUrl, setScanUrl] = useState(searchParams.get("url") || "");

    const changeSearchUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        setScanUrl(event.target.value);
    };

    const scan = () => {
        submitScan(scanUrl, visibility, setResult);
    };

    const handleOnSubmit = (e : any) => {
        e.preventDefault();
        scan();
    };

    return (
        <form onSubmit={handleOnSubmit} className="input-container">
            <input className="search-bar" placeholder="URL" value={scanUrl} onChange={changeSearchUrl}></input>

            <NavLink to={`/scan?url=${encodeURIComponent(scanUrl)}`} className="scan-link">
                <button className="scan-button" onClick={scan}>
                    <img id="magnifier" src={magnifier} alt="Scan Icon" />
                    Scan
                </button>
            </NavLink>

            <Options options={options} setOptions={setOptions} visibility={visibility} setVisibility={setVisibility} />
        </form>
    );
}