"use client";
import React, { useState, useEffect } from "react";
import DarthVaderSaber from "@/components/DarthVaderSaber";

const Loading = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (percent >= 1) {
        clearInterval(interval);
      } else {
        setPercent((prevPercent) => prevPercent + 0.001);
      }
    }, 5);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [percent]);

  return (
    <div className="saber-Loading">
      <DarthVaderSaber percent={percent} />
    </div>
  );
};

export default Loading;
