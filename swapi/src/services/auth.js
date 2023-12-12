import { api } from "./api";

export const signIn = async (data) => {
  try {
    const response = await api.post("/auth/sign-in", data);
    if (!response.data) {
      throw new Error("Servidor indisponível. Tente novamente mais tarde.");
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Servidor indisponível. Tente novamente mais tarde.");
    }
  }
};
