import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {
  getAllCharacters,
  insertCharacter,
  getCharacterById,
} from "@/controllers/character-controller";
import { characterSchema } from "@/schemas/character-schema";

const characterRouter = Router();

characterRouter.post(
  "/",
  authenticateToken,
  validateBody(characterSchema),
  insertCharacter
);
characterRouter.get("/all", authenticateToken, getAllCharacters);
characterRouter.get("/:id", authenticateToken, getCharacterById);

export { characterRouter };
