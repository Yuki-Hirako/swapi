import userService from "@/services/users-service";
import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function getUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const user = await userService.getUser(userId);
    return res.status(httpStatus.OK).send(user);
  } catch (error: any) {
    return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
  }
}