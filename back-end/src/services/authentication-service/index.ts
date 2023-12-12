import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { username, password } = params;

  console.log(username, password);

  const user = await userRepository.findByName(username as string);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  validatePasswordOrFail(password as string, user.password);
  const token = await createSession(user.id);

  return {
    user: exclude(user, "password"),
    token,
  };
}

export async function createSession(userId: number) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("Something went wrong.");
  }

  const token = jwt.sign({ userId }, JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

export async function validatePasswordOrFail(
  password: string,
  userPassword: string | null
) {
  if (userPassword === null) {
    throw new Error("Unexpected error: user does not have a password.");
  }

  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw new Error("Invalid username or password");
}

export type SignInParams = Pick<User, "username" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "username">;
  token: string;
};

const authenticationService = {
  signIn,
};

export default authenticationService;
