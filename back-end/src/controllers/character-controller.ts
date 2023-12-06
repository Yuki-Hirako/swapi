import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import characterService from "@/services/character-service";

export async function insertCharacter(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { userId } = req;
    const characterData = req.body;
    const character = await characterService.insertCharacter(
      userId as number,
      characterData
    );
    return res.status(httpStatus.OK).send(character);
  } catch (error: any) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}
