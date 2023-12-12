import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getAllCharacters,
  insertCharacter,
} from "@/controllers/character-controller";

const characterRouter = Router();

characterRouter.post("/", authenticateToken, insertCharacter);
characterRouter.get("/all", authenticateToken, getAllCharacters);

export { characterRouter };
