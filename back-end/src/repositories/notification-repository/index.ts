// notification-repository.ts
import { prisma } from "@/config";
import { Notification, Prisma } from "@prisma/client";

async function createNotification(
  data: Prisma.NotificationUncheckedCreateInput
): Promise<Notification> {
  return prisma.notification.create({
    data,
  });
}

async function getAllNotificationsForUser(
  userId: number | undefined
): Promise<Notification[]> {
  return prisma.notification.findMany({
    where: {
      NOT: {
        userId: userId,
      },
    },
  });
}

const notificationRepository = {
  createNotification,
  getAllNotificationsForUser,
};

export default notificationRepository;
