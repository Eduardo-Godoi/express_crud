import { Request, Response } from "express";
import CreateUserService from "../services/createUser.service";

class CreateUserControler {
  async handle(request: Request, response: Response) {
    const { name, email, password, isAdm } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      isAdm,
    });

    return response.status(201).json(user);
  }
}

export default CreateUserControler;
