import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import characterService from "@/services/character-service";
import { Character } from "@prisma/client";

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

export async function getAllCharacters(
  _req: AuthenticatedRequest,
  res: Response
): Promise<Response<Character[] | any>> {
  try {
    const characters = await characterService.getAllCharacters();
    return res.status(httpStatus.OK).send(characters);
  } catch (error: any) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}

export async function getCharacterById(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const character = await characterService.getCharacterById(id as string);

    if (!character) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ message: "Character not found" });
    }

    return res.status(httpStatus.OK).send(character);
  } catch (error: any) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}
