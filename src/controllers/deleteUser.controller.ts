import { Request, Response } from "express";
import DeleteUserService from "../services/deleteUser.service";

class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const authUserId = request.user.id;

    const deleteUserService = new DeleteUserService();

    const user = await deleteUserService.execute(id, authUserId);

    return response.status(200).json(user);
  }
}

export default DeleteUsersController;
