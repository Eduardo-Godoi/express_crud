import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/users.repository";

class ListUserService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
