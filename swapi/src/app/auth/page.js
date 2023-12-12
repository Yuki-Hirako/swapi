"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, EyeClosed, EyeOpen } from "../../components/Icons";
import { signIn } from "../../services/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn({ username, password });

      if (response && response.token) {
        router.push(`/api/auth/login?token=${response.token}`);
      } else {
        throw new Error("Token is missing");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError(error.message || "An unexpected error occurred.");
    }
  };

  const isLoginButtonDisabled = !username || password.length < 3;

  return (
    <div className="flex flex-col max-w-md bg-gray-800 text-white">
      <header className="flex items-center justify-between py-4">
        <button className="mr-4" onClick={() => window.history.back()}>
          <ChevronLeft color="#fff" />
        </button>
        <h1 className="flex-1 text-center mr-4">Log in</h1>
      </header>

      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleLoginSubmit}
          className="flex flex-col items-center gap-3 p-4"
        >
          <label className="self-start text-sm font-medium mt-2">Username</label>
          <input
            type="text"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu username"
            className="w-full bg-gray-700 text-white p-2 rounded"
            required
          />

          <label className="self-start text-sm font-medium mt-2">Senha</label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed color="#89898B" />
              ) : (
                <EyeOpen color="#89898B" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`bg-white ${
              isLoginButtonDisabled ? "text-gray-400" : "text-gray-900"
            } p-2 rounded`}
            disabled={isLoginButtonDisabled}
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
