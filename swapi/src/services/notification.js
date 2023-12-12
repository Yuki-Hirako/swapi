import { api } from "./api";

export const getNotifications = async (token) => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    const response = await api.get("/user-notification/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const markAsRead = async (id, token) => {
  if (!token) {
    throw new Error("Token não encontrado");
  }

  try {
    await api.get(`/user-notification/${id}/read`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
