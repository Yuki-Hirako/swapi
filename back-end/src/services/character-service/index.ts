import characterRepository from "@/repositories/character-repository";
import notificationService from "../notification-service";

type CharacterData = {
  name: string;
  birth_year: string;
  gender: string;
};

export async function insertCharacter(
  userId: number,
  characterData: CharacterData
) {
  const character = await characterRepository.create({
    ...characterData,
    userId,
  });
  await notificationService.createNotification({
    title: "Novo personagem adicionado!",
    message: `O personagem ${characterData.name} foi adicionado pelo usuário ${userId}`,
    userId: userId,
  });
  return character;
}

const characterService = {
  insertCharacter,
};

export default characterService;
