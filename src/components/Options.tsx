import { useEffect, useRef } from 'react';
import gear from "../assets/images/iconmonstr-gear-1-240.png"
import './Options.css'

interface OptionsProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
}

export function Options({ options, setOptions, visibility, setVisibility }: OptionsProps) {
    const optionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                setOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="options-container" ref={optionsRef}>
            <button className="options-button" type="button" onClick={() => setOptions(!options)}>
                <img id="gear" src={gear} alt="Gear Icon"></img>
            </button>

            {options && (
                <div className="options-menu">
                    <button
                        className={visibility === "public" ? "public selected" : "public"}
                        type="button"
                        onClick={() => {
                            setVisibility("public");
                            setOptions(!options);
                        }}>
                        Public
                    </button>
                    <button
                        className={visibility === "unlisted" ? "unlisted selected" : "unlisted"}
                        type="button"
                        onClick={() => {
                            setVisibility("unlisted");
                            setOptions(!options);
                        }}>
                        Unlisted
                    </button>
                    <button
                        className={visibility === "private" ? "private selected" : "private"}
                        type="button"
                        onClick={() => {
                            setVisibility("private");
                            setOptions(!options);
                        }}>
                        Private
                    </button>
                </div>
            )}
        </div>
    )
}