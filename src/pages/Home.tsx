import { Title } from '../components/Title'
import { UrlInput } from '../components/UrlInput'
import invertocatblack from "../assets/images/GitHub_Invertocat_Black.png"
import invertocatwhite from "../assets/images/GitHub_Invertocat_White.png"
import './Home.css'

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

interface HomeProps {
    theme: string,
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function Home({ theme, options, setOptions, visibility, setVisibility, setResult }: HomeProps) {
    return (
        <>
            <a href="https://github.com/Hlee50/urlscanlite">
                <img id="github-icon"
                    src={theme === "dark" ? invertocatwhite : invertocatblack}
                    alt="GitHub Invertocat" />
            </a>

            <div className="home-container">
                <Title />
                <UrlInput options={options} setOptions={setOptions}
                    visibility={visibility} setVisibility={setVisibility}
                    setResult={setResult} />
            </div>
            
            <div className="description">
                A lite version of&nbsp;<a href="https://urlscan.io" className="urlscan-link">urlscan.io</a>
            </div>
        </>
    );
}