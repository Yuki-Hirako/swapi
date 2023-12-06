// push-notification-controller.ts
import notificationService from "@/services/notification-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function sendNotifications(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {
  const { userId } = req;
  const { title, message } = req.body;

  if (!userId) {
    throw new Error("Usuário não encontrado");
  }

  try {
    const result = await notificationService.createNotification({
      title,
      message,
      userId,
    });

    return res.status(httpStatus.OK).send(result);
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
}

export async function getAllNotifications(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {
  const { userId } = req;

  try {
    const notifications = await notificationService.getAllNotifications(userId);

    return res.status(httpStatus.OK).json(notifications);
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
}
