import { Router, Request, Response } from "express";
import { UsersController } from "../controller/UsersController";
const userController: UsersController = new UsersController();

const router: Router = Router();

router.get("/", (req: Request, res: Response) =>
  userController.getUsersAll(req, res)
);
router.get("/id/:id", (req: Request, res: Response) =>
  userController.getUserById(req, res)
);
router.get("/search", (req: Request, res: Response) =>
  userController.getUsersBySearch(req, res)
);
router.get("/ageBetween/:min/:max", (req: Request, res: Response) =>
  userController.getUsersByAgeBetween(req, res)
);
router.post("/newUser", (req: Request, res: Response) =>
  userController.addUser(req, res)
);
router.put("/id/:id", (req: Request, res: Response) =>
  userController.putUser(req, res)
);
router.delete("/removeInatives", (req: Request, res: Response) =>
  userController.deleteInativesUsers(req, res)
);

export default router;
