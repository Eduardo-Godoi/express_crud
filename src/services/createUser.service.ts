import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

class CreateUserService {
  async execute({ name, email, password, isAdm }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new AppError("Missing e-mail", 400);
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new AppError("E-mail already registered", 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdm,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
