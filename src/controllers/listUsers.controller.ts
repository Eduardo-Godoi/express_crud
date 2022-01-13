import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import ListUserService from "../services/listUsers.service";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersService = new ListUserService();

    const users = await listUsersService.execute();

    return response.status(200).json(classToClass(users));
  }
}

export default ListUsersController;
