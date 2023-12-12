import { api } from "./api";

export const getAllCharacters = async (token) => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await api.get("/character/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const insertCharacter = async (characterData, token) => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    await api.post(`/character`, characterData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export async function getCharacterById(id, token) {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await api.get(`/character/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
