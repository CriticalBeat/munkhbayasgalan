import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function countdown() {
  const [timeLeft, setTimeLeft] = useState(10);
  const router = useRouter();
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button className="absolute top-4 left-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition" onClick={() => router.push("/")}>Back</button>
      <h1 className="text-3xl font-bold text-black">Countdown: {timeLeft}</h1>
    </div>
  );
}
