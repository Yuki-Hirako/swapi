import userRepository from "@/repositories/user-repository";

if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
  throw new Error("Mailjet API keys are missing from environment variables!");
}

export type CreateUserParams = {
  email: string;
  password: string;
  username: string;
};

export async function getUser(userId: number | undefined) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const selectedUser = {
    id: user.id,
    username: user.username,

    createdAt: user.createdAt,
  };

  return selectedUser;
}


const userService = {
  getUser,
};

export default userService;
