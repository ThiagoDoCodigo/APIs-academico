import { Router } from "express";
import { UsersController } from "../controller/UsersController";
const userController: UsersController = new UsersController();

const router: Router = Router();

router.get("/", (req, res) => userController.getUsersAll(req, res));
router.get("/id/:id", (req, res) => userController.getUserById(req, res));
router.get("/search", (req, res) => userController.getUsersBySearch(req, res));
router.get("/ageBetween/:min/:max", (req, res) =>
  userController.getUsersByAgeBetween(req, res)
);
router.post("/newUser", (req, res) => userController.addUser(req, res));
router.put("/id/:id", (req, res) => userController.putUser(req, res));
router.delete("/removeInatives", (req, res) =>
  userController.deleteInativesUsers(req, res)
);

export default router;
