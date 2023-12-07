import { prisma } from "@/config";
import { Character, Prisma } from "@prisma/client";

async function create(data: Prisma.CharacterUncheckedCreateInput) {
  return prisma.character.create({
    data,
  });
}

async function findAll(): Promise<Character[]> {
  return prisma.character.findMany();
}

async function findByName(name: string): Promise<Character[]> {
  return prisma.character.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive", // Para uma busca que não diferencia maiúsculas de minúsculas
      },
    },
  });
}

const characterRepository = {
  create,
  findAll,
  findByName,
};

export default characterRepository;
