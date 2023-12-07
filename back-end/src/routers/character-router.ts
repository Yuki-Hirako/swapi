import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getAllCharacters,
  insertCharacter,
} from "@/controllers/character-controller";

const characterRouter = Router();

characterRouter.post("/character", authenticateToken, insertCharacter);
characterRouter.get("/characters", authenticateToken, getAllCharacters);

export { characterRouter };
