import { Router } from "express";
import CreateUserControler from "./controllers/createUser.controler";
import ListUsersController from "./controllers/listUsers.controller";
import LoginController from "./controllers/login.controller";
const router = Router();

const createUserController = new CreateUserControler();
const listUsersController = new ListUsersController();
const loginController = new LoginController();

router.post("/users", createUserController.handle);
router.get("/users", listUsersController.handle);
router.post("/login", loginController.handle);

export default router;
