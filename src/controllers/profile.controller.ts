import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import ProfileService from "../services/profile.service";

class ProfileController {
  async handle(request: Request, response: Response) {
    const listProfile = new ProfileService();
    const users = await listProfile.execute(request.user.id);

    return response.status(200).json(classToClass(users));
  }
}

export default ProfileController;
