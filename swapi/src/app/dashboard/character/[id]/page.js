"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../../loading";
import { getCharacterById } from "../../../../services/character";

export default function CharacterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (id) {
      getCharacterById(id) // Substitua por sua função para buscar um personagem pelo ID
        .then((response) => {
          setCharacter(response);
        })
        .catch((error) => {
          console.error("Error fetching character", error.message);
        });
    }
  }, [id]);

  if (!character)
    return (
      <div className="text-center text-white mt-5">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col bg-gray-800 text-white p-5">
      <h1 className="text-4xl font-bold mb-5">{character.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <span className="font-semibold">Birth Year:</span>{" "}
          {character.birth_year}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {character.gender}
        </div>
      </div>
      <button
        className="mt-5 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
}
