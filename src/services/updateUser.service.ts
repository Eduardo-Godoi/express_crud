import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

interface IProps {
  id: string;
  data: BodyData;
  authUserId: string;
}

interface BodyData {
  name?: string;
  email?: string;
  password?: string;
  isAdm?: boolean;
  updated_at: Date;
}

class UpdateUserService {
  async execute({ id, data, authUserId }: IProps) {
    const usersRepository = getCustomRepository(UsersRepository);
    const authUser = await usersRepository.findOne({
      where: { id: authUserId },
    });

    console.log(authUserId, "--", id);

    if (authUser?.id !== id && authUser?.isAdm === false) {
      throw new AppError("Unauthorized, only admin is allowed to update", 401);
    }

    const { password, email } = data;
    if ("isAdm" in data) {
      throw new AppError("IsAdm field cannot be updated", 400);
    }

    const userWithUpdatedEmail = await usersRepository.findOne({
      where: { email: email },
    });

    if (userWithUpdatedEmail) {
      throw new AppError("Email already in use", 400);
    }

    if (password) {
      const hashPassword = await hash(password, 8);
      data.password = hashPassword;
    }

    const newData = {
      ...data,
      updated_at: new Date(),
    };

    await usersRepository.update(id, newData);
    const user = usersRepository.findOne({ id });

    return user;
  }
}

export default UpdateUserService;
