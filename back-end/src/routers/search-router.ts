// searchRouter.ts
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { searchCharacters } from "@/controllers";

const searchRouter = Router();

searchRouter.post("/search", authenticateToken, searchCharacters);

export { searchRouter };
