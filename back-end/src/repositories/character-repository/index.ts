import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function create(data: Prisma.CharacterUncheckedCreateInput) {
  return prisma.character.create({
    data,
  });
}

const characterRepository = {
  create,
};

export default characterRepository;
