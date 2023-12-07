// searchController.ts
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import searchService from "@/services/search-service";

export async function searchCharacters(
  req: AuthenticatedRequest,
  res: Response
): Promise<Response> {
  try {
    const { userId } = req;
    const searchTerm = req.body.search;
    const characters = await searchService.performSearch(
      userId as number,
      searchTerm
    );
    return res.status(httpStatus.OK).send(characters);
  } catch (error: any) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
}

const searchController = {
  searchCharacters,
};

export default searchController;
