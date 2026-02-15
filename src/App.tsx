import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { Home } from "./pages/Home"
import { ScanResult } from './pages/ScanResult'
import sun from "./assets/images/iconmonstr-weather-2-240.png"
import moon from "./assets/images/iconmonstr-weather-119-240.png"
import './App.css'

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

function App() {
  const [theme, setTheme] = useState("dark");
  const [options, setOptions] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [result, setResult] = useState<Result>(null);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "light";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <img
        id="theme-icon"
        src={theme === "dark" ? sun : moon} alt="Theme Icon"
        onClick={toggleTheme}
      />

      <Routes>
        <Route index element={<Home options={options} setOptions={setOptions}
          visibility={visibility} setVisibility={setVisibility} 
          setResult={setResult}/>} />
        <Route path="/scan" element={<ScanResult options={options} setOptions={setOptions}
          visibility={visibility} setVisibility={setVisibility} result={result} setResult={setResult} />} />
      </Routes>
    </>
  );
}

export default App
