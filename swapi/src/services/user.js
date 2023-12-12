"use client";
import { api } from "./api";

export async function getUser(token) {
  try {
    const user = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!user.data) {
      throw new Error("Servidor indisponível. Tente novamente mais tarde.");
    }
    return user.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Servidor indisponível. Tente novamente mais tarde.");
    }
  }
}
