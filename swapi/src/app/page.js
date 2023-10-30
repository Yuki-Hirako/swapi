"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "./loading";
const CharacterList = React.lazy(() => import("../components/CharacterList"));

export default function Home() {
  const [search, setSearch] = useState("");
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const sourceRef = useRef(null);

  const fetchData = async (page = 1, searchTerm = "") => {
    setIsLoading(true);
    setError(null);

    const CancelToken = axios.CancelToken;
    sourceRef.current = CancelToken.source();

    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}&search=${searchTerm}`,
        { cancelToken: sourceRef.current.token }
      );
      if (!response.data.results.length) {
        setError("No characters found.");
      }
      setCharacters(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
      setIsLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Error fetching data", error);
        setIsLoading(false);
        setError("Failed to fetch data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage, search);
    return () => {
      if (sourceRef.current) {
        sourceRef.current.cancel(
          "Query was canceled due to a new request or component unmounting."
        );
      }
    };
  }, [search, currentPage]);

  const handleCharacterClick = (url) => {
    const id = url.match(/\/([0-9]+)\/$/)[1];
    router.push(`/character/page?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
      <div className="w-1/2">
        <input
          type="text"
          className="border rounded p-2 w-full bg-gray-700 text-white placeholder-gray-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search for a Star Wars character..."
        />
        {isLoading ? (
          <div className="mt-4 text-center">
            <Loading />
          </div>
        ) : error ? ( // Check for an error
          <div className="mt-4 text-center text-red-500">{error}</div>
        ) : (
          <Suspense fallback={<Loading />}>
            <CharacterList
              characters={characters}
              onCharacterClick={handleCharacterClick}
            />
          </Suspense>
        )}
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`m-1 p-2 ${
                index + 1 === currentPage ? "bg-gray-600" : "bg-gray-700"
              } hover:bg-gray-600`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
