"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "./user";
import { useAuth } from "../components/context";
import Loading from "../app/loading";

const Token = ({ newtoken, children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { token, setToken } = useAuth();


  useEffect(() => {
    if (newtoken) {
      setToken(newtoken);
    }
  }, [newtoken]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(token);
        setUser(userData);
      } catch (error) {
        setIsError(true);
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !user) {
    return null; // ou uma mensagem de erro
  }

  return (
    <>
      <div className="flex flex-col justify-start w-full">{children}</div>
    </>
  );
};

export default Token;