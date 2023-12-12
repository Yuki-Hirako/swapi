import userRepository from "@/repositories/user-repository";

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
