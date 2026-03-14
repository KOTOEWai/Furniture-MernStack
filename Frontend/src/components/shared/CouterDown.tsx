import type { Time } from "@/types";
import { useEffect, useState } from "react";



export default function CountdownTimer() {
  const calculateTimeLeft = (): Time => {
    const targetDate = new Date("2025-09-15T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  const [timeLeft, setTimeLeft] = useState<Time>(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      style={{ backgroundColor: "#ffc18c" }}
      className="flex flex-col items-center justify-center w-full max-w-6xl px-4 py-6 mx-auto mt-3 space-y-6 shadow-lg md:flex-row md:justify-between md:space-y-0 md:px-12 lg:px-24"
    >
      {/* Left Section */}
      <div className="text-center md:text-left">
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Limited Time
        </p>
        <h2 className="mt-2 text-xl font-bold text-black sm:text-2xl md:text-3xl">
          DEALS EXPIRE SOON!
        </h2>
      </div>

      {/* Timer Section */}
      <div className="flex flex-wrap justify-center gap-4 text-center sm:gap-6">
        {/* Days */}
        <div className="w-20">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {String(timeLeft.days).padStart(2, "0")}
          </p>
          <p className="text-xs text-black sm:text-sm">Days</p>
        </div>

        {/* Hours */}
        <div className="w-20">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {String(timeLeft.hours).padStart(2, "0")}
          </p>
          <p className="text-xs text-black sm:text-sm">Hours</p>
        </div>

        {/* Minutes */}
        <div className="w-20">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {String(timeLeft.minutes).padStart(2, "0")}
          </p>
          <p className="text-xs text-black sm:text-sm">Mins</p>
        </div>

        {/* Seconds */}
        <div className="w-20">
          <p className="text-2xl font-bold text-black sm:text-3xl">
            {String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <p className="text-xs text-black sm:text-sm">Secs</p>
        </div>
      </div>
    </div>
  );
}
