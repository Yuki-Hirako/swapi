// notification-service.ts
import notificationRepository from "@/repositories/notification-repository";
import { Notification } from "@prisma/client";

type CreateNotificationInput = {
  title: string;
  message: string;
  userId: number;
};

async function createNotification({
  title,
  message,
  userId,
}: CreateNotificationInput): Promise<Notification> {
  return await notificationRepository.createNotification({
    title,
    message,
    userId,
  });
}

async function getAllNotifications(
  userId: number | undefined
): Promise<Notification[]> {
  return await notificationRepository.getAllNotificationsForUser(userId);
}

const notificationService = {
  createNotification,
  getAllNotifications,
};

export default notificationService;
