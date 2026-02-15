import gear from "../assets/images/iconmonstr-gear-1-240.png"
import './Options.css'

interface OptionsProps {
    options: boolean;
    setOptions: React.Dispatch<React.SetStateAction<boolean>>;
    visibility: string;
    setVisibility: React.Dispatch<React.SetStateAction<string>>;
}

export function Options({ options, setOptions, visibility, setVisibility }: OptionsProps) {
    return (
        <div className="options-container">
            <button className="options-button" onClick={() => setOptions(!options)}>
                <img id="gear" src={gear} alt="Gear Icon"></img>
            </button>

            {options && (
                <div className="options-menu">
                    <button
                        className={visibility === "public" ? "public selected" : "public"}
                        onClick={() => {
                            setVisibility("public");
                            setOptions(!options);
                        }}>
                        Public
                    </button>
                    <button
                        className={visibility === "unlisted" ? "unlisted selected" : "unlisted"}
                        onClick={() => {
                            setVisibility("unlisted");
                            setOptions(!options);
                        }}>
                        Unlisted
                    </button>
                    <button
                        className={visibility === "private" ? "private selected" : "private"}
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