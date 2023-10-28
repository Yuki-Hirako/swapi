"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";

export default function CharacterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://swapi.dev/api/people/${id}/`).then((response) => {
        setCharacter(response.data);
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
        <div>
          <span className="font-semibold">Height:</span> {character.height}
        </div>
        <div>
          <span className="font-semibold">Mass:</span> {character.mass}
        </div>
        <div>
          <span className="font-semibold">Hair Color:</span>{" "}
          {character.hair_color}
        </div>
        <div>
          <span className="font-semibold">Skin Color:</span>{" "}
          {character.skin_color}
        </div>
        <div>
          <span className="font-semibold">Eye Color:</span>{" "}
          {character.eye_color}
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
