import { Router } from "express";
import CreateUserControler from "./controllers/createUser.controler";
import ListUsersController from "./controllers/listUsers.controller";
import LoginController from "./controllers/login.controller";
import ProfileController from "./controllers/profile.controller";
import UpdateUserController from "./controllers/updateUser.controller";
import Authentication from "./middlewares/authentication";
import Isadm from "./middlewares/IsAdministrator";

const router = Router();

const createUserController = new CreateUserControler();
const listUsersController = new ListUsersController();
const loginController = new LoginController();
const profileController = new ProfileController();
const updateUserController = new UpdateUserController();

router.post("/users", createUserController.handle);
router.post("/login", loginController.handle);
router.use(Authentication);
router.get("/users", Isadm, listUsersController.handle);
router.get("/users/profile", profileController.handle);
router.patch("/users/:id", updateUserController.handle);

export default router;
