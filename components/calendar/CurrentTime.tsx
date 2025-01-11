"use client";

import React, { useEffect, useState } from "react";

const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getCurrentTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("fr-FR", options).format(now);
};

const RealTimeClockWithDate: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    setCurrentDate(getCurrentDate());

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h2 className="text-center">
      {currentDate} - {currentTime}
    </h2>
  );
};

export default RealTimeClockWithDate;
