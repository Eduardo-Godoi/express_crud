import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

export default async function Isadm(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const usersRepository = getCustomRepository(UsersRepository);
  const userAdm = await usersRepository.findOne({
    where: { id: request.user.id },
  });

  if (!userAdm?.isAdm) {
    throw new AppError("Unauthorized", 401);
  }

  next();
}
