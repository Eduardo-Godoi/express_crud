import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import UpdateUserService from "../services/updateUser.service";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const data = request.body;
    const authUserId = request.user.id;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({ id, data, authUserId });

    return response.status(200).json(classToClass(user));
  }
}

export default UpdateUserController;
