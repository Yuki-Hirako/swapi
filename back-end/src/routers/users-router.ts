import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getUser } from "@/controllers/users-controller";

const usersRouter = Router().get("/", authenticateToken, getUser);

export { usersRouter };
