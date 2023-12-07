// searchRepository.ts
import { prisma } from "@/config";
import { Prisma, Search } from "@prisma/client";

async function create(
  data: Prisma.SearchUncheckedCreateInput
): Promise<Search> {
  return prisma.search.create({
    data,
  });
}

const searchRepository = {
  create,
};

export default searchRepository;
