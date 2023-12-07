// push-notification-router.ts
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllNotifications, sendNotifications } from "@/controllers";

const notificationRouter = Router();

notificationRouter.all("/*", authenticateToken);
notificationRouter.post("/", sendNotifications);
notificationRouter.get("/", getAllNotifications);

export { notificationRouter };
