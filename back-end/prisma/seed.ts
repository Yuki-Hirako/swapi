import { insertCharacter } from "@/services/character-service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CharacterData = {
  name: string;
  birth_year: string;
  gender: string;
};

async function main() {
  const users = [
    { username: "user1", password: "password123" },
    { username: "user2", password: "password123" },
    { username: "user3", password: "password123" },
  ];

  const characters = [
    { name: "Luke Skywalker", birth_year: "19BBY", gender: "male" },
    { name: "Darth Vader", birth_year: "41.9BBY", gender: "male" },
    { name: "Leia Organa", birth_year: "19BBY", gender: "female" },
    { name: "Han Solo", birth_year: "29BBY", gender: "male" },
    { name: "Chewbacca", birth_year: "200BBY", gender: "male" },
    { name: "Yoda", birth_year: "896BBY", gender: "male" },
    { name: "Obi-Wan Kenobi", birth_year: "57BBY", gender: "male" },
    { name: "Anakin Skywalker", birth_year: "41.9BBY", gender: "male" },
    { name: "R2-D2", birth_year: "unknown", gender: "n/a" },
  ];

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    for (let i = 0; i < 3; i++) {
      const characterData = characters[i + users.indexOf(user) * 3];
      await insertCharacter(createdUser.id, characterData as CharacterData);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
