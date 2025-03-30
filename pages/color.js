import { useState } from "react";

export default function color() {
  const [bgColor, setBgColor] = useState("white");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: bgColor }}>
      <h1 className="text-2xl font-bold mb-4 text-black">Change Background Color</h1>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => setBgColor("red")}>Red</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => setBgColor("green")}>Green</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setBgColor("blue")}>Blue</button>
      </div>
    </div>
  );
}
