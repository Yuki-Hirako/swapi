// searchService.ts
import characterRepository from "@/repositories/character-repository";
import searchRepository from "@/repositories/search-repository";
import { Character } from "@prisma/client";

async function performSearch(userId: number, searchTerm: string): Promise<Character[]> {
  await searchRepository.create({ userId, search: searchTerm });

  // Supondo que você tenha um método no characterRepository para buscar por nome
  const characters = await characterRepository.findByName(searchTerm);
  return characters;
}

const searchService = {
  performSearch,
};

export default searchService;
