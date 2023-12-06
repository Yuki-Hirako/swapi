import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof PrismaClientKnownRequestError) {
    console.error(err);
    const { code, meta } = err;
    if (code === "P2002") {
      res.status(400).json({
        message: "Bad Request",
        error: `The ${meta?.target} is already in use.`,
      });
    } else {
      res.status(404).json({
        message: "Not Found",
        error: `${meta?.cause}`,
      });
    }
  } else {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
