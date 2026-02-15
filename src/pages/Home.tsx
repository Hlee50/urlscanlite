import { Title } from '../components/Title'
import { UrlInput } from '../components/UrlInput'
import './Home.css'

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

interface HomeProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function Home({ options, setOptions, visibility, setVisibility, setResult }: HomeProps) {
    return (
        <>
            <div className="home-container">
                <Title />
                <UrlInput options={options} setOptions={setOptions}
                    visibility={visibility} setVisibility={setVisibility}
                    setResult={setResult} />
            </div>
            <span className="description">
                A lite version of&nbsp;<a href="https://urlscan.io" className="urlscan-link">urlscan.io</a>
            </span>
        </>
    );
}