"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import { useAuth } from "../../../components/context";
import { SearchProvider, useSearch } from "../../../contexts/SearchContext";
import { getAllCharacters } from "../../../services/character";
const CharacterList = React.lazy(() =>
  import("../../../components/CharacterList")
);

export default function Home() {
  const { searchTerm, setSearchTerm, searchResults, setSearchResults } =
    useSearch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useAuth();

  const router = useRouter();

  const sourceRef = useRef(null);

  const fetchData = async (page = 1, searchTerm = "") => {
    setIsLoading(true);
    setError(null);

    try {
      const characters = await getAllCharacters(token);
      setSearchResults(characters);
      setTotalPages(1);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching characters", error.message);
      setIsLoading(false);
      setError("Failed to fetch characters. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (sourceRef.current) {
        sourceRef.current.cancel(
          "Query was canceled due to a new request or component unmounting."
        );
      }
    };
  }, [searchTerm, currentPage]);

  const handleCharacterClick = (id) => {
    router.push(`/dashboard/character/page?id=${id}`);
  };

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-800 text-white flex items-center justify-center">
        <div className="w-1/2">
          <input
            type="text"
            className="border rounded p-2 w-full bg-gray-700 text-white placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search for a Star Wars character..."
          />
          {isLoading ? (
            <div className="mt-4 text-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="mt-4 text-center text-red-500">{error}</div>
          ) : (
            <Suspense fallback={<Loading />}>
              <CharacterList
                characters={searchResults}
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
    </SearchProvider>
  );
}
