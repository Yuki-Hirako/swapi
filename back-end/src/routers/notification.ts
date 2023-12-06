// push-notification-router.ts
import { authenticateToken, /* validateBody */ } from "@/middlewares";
import {
  getAllNotifications,
} from "@/controllers";
/* import { notificationSchema } from "@/schemas";
 */import { Router } from "express";

const notificationRouter = Router();

notificationRouter.all("/*", authenticateToken);
notificationRouter.get("/", getAllNotifications);

export { notificationRouter };
