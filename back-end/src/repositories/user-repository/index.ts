import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByName(username: string) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

async function create(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function update(id: number, data: Prisma.UserUpdateInput) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

async function findById(id: number | undefined) {
  return prisma.user.findUnique({
    where: { id },
  });
}

const userRepository = {
  create,
  update,
  findById,
  findByName,
};

export default userRepository;
