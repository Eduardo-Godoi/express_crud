import { getCustomRepository } from "typeorm";
import User from "../entities/user.entity";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

class ProfileService {
  async execute(user_id: string): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError("User Not Found", 404);
    }

    return user;
  }
}

export default ProfileService;
