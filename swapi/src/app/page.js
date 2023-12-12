"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Bem-vindo!</h1>
        <p className="text-lg mb-8">Faça login para acessar o conteúdo.</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoginClick}
        >
          Fazer Login
        </button>
      </div>
    </div>
  );
}
