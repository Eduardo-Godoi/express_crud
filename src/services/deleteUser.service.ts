import { getCustomRepository } from "typeorm";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

class DeleteUserService {
  async execute(id: string, authUserId: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const authUser = await usersRepository.findOne({
      where: { id: authUserId },
    });

    if (authUser?.id !== id && authUser?.isAdm === false) {
      throw new AppError("Missing admin permissions", 401);
    }
    await usersRepository.delete(id);

    return { message: "User deleted with success" };
  }
}

export default DeleteUserService;
