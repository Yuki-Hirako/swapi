import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {
  getAllCharacters,
  insertCharacter,
  getCharacterById
} from "@/controllers/character-controller";

const characterRouter = Router();

characterRouter.post("/", authenticateToken, insertCharacter);
characterRouter.get("/all", authenticateToken, getAllCharacters);
characterRouter.get("/:id", authenticateToken, getCharacterById);


export { characterRouter };
