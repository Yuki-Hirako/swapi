"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "../../loading";
import { useAuth } from "../../../components/context";
import { SearchProvider, useSearch } from "../../../contexts/SearchContext";
import { getAllCharacters, insertCharacter } from "../../../services/character";
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
  const [showForm, setShowForm] = useState(false);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    birth_year: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await insertCharacter(newCharacter, token);
      // After successful addition, fetch characters again to update the list
      fetchData();
      setNewCharacter({
        name: "",
        birth_year: "",
        gender: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding character:", error);
      setError(error.message);
    }
  };

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
          <div className="flex gap-2">
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
            <div className="mt-4 flex justify-end">
              <button
                className="p-2 bg-gray-600 rounded text-white"
                onClick={() => setShowForm(!showForm)}
              >
                +
              </button>
            </div>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={newCharacter.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border rounded p-2 mt-2 w-full bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="birth_year"
                value={newCharacter.birth_year}
                onChange={handleInputChange}
                placeholder="Birth Year"
                className="border rounded p-2 mt-2 w-full bg-gray-700 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="gender"
                value={newCharacter.gender}
                onChange={handleInputChange}
                placeholder="Gender"
                className="border rounded p-2 mt-2 w-full bg-gray-700 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="mt-2 p-2 bg-gray-600 rounded text-white"
              >
                Add Character
              </button>
            </form>
          )}
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
