import { Router } from "express";
import { UsersController } from "../controller/UsersController";
const usersController = new UsersController();

const router = Router();

router.get("/", (res, req) => usersController.usersGetAll(res, req));

export default router;
