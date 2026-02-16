import { NavLink } from 'react-router'
import { Title } from '../components/Title'
import { UrlInput } from './UrlInput'
import './Header.css'

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

interface HeaderProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
    setResult: React.Dispatch<React.SetStateAction<Result | null>>;
}

export function Header({ options, setOptions, visibility, setVisibility, setResult }: HeaderProps) {
    return (
        <>
            <div className="header-container">
                <NavLink to="/" className="home-link">
                    <Title />
                </NavLink>

                <UrlInput options={options} setOptions={setOptions}
                    visibility={visibility} setVisibility={setVisibility}
                    setResult={setResult} />
            </div>
        </>
    );
}