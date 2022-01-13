import { compare } from "bcryptjs";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import AuthConfig from "../config/jwtAuth";
import AppError from "../errors/appError";
import { UsersRepository } from "../repositories/users.repository";

dotenv.config();

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

interface JwtData {
  secret: string;
  expiresIn: string;
}

export default class LoginService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("Wrong email/password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Wrong email/password", 401);
    }

    const { expiresIn, secret } = AuthConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { token };
  }
}
