import React from "react";

function CharacterList({ characters, onCharacterClick }) {
  return (
    <ul className="mt-4">
      {characters.map((char, index) => (
        <li
          key={index}
          className="mb-2 cursor-pointer hover:underline"
          onClick={() => onCharacterClick(char.id)}
        >
          {char.name}
        </li>
      ))}
    </ul>
  );
}

export default CharacterList;
