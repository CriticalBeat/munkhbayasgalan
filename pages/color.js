import { useState } from "react";
import { useRouter } from "next/router";

export default function Color() {
  const [bgColor, setBgColor] = useState("white");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundColor: bgColor }}>
      <button className="absolute top-4 left-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition" onClick={() => router.push("/")}>
        Back to Home
      </button>
      <h1 className="text-2xl font-bold mb-4 text-black">Change Background Color</h1>
      <div className="flex gap-4 mb-4">
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => setBgColor("red")}>Red</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => setBgColor("green")}>Green</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setBgColor("blue")}>Blue</button>
      </div>
    </div>
  );
}
