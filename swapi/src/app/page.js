"use client";
import React, { useState, useEffect, Suspense } from "react";
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
  const router = useRouter();

  const fetchData = async (page = 1, searchTerm = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?page=${page}&search=${searchTerm}`
      );
      setCharacters(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(currentPage, search);
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
          <p className="mt-4 text-center">
            <Loading />
          </p>
        ) : (
          <Suspense fallback={<div>Loading characters...</div>}>
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
