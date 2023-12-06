import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { insertCharacter } from "@/controllers/character-controller";

const characterRouter = Router();

characterRouter.post("/character", authenticateToken, insertCharacter);

export { characterRouter };
