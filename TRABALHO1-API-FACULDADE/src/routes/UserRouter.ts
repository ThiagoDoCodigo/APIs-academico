import { UserController } from "../controllers/UserController";
import { Router, Request, Response } from "express";
const userController = new UserController();

const router: Router = Router();

router.get("/", (req: Request, res: Response) =>
  userController.getUsersAll(req, res)
);
router.get("/id/:id", (req: Request, res: Response) =>
  userController.getUserById(req, res)
);

router.get("/search", (req: Request, res: Response) =>
  userController.getUsersByName(req, res)
);

router.get("/ageBetween/:min/:max", (req: Request, res: Response) =>
  userController.getUsersByAgeBetween(req, res)
);

router.post("/newUser", (req: Request, res: Response) =>
  userController.createUser(req, res)
);

router.put("/id/:id", (req: Request, res: Response) =>
  userController.putUser(req, res)
);

router.delete("/removeInatives", (req: Request, res: Response) =>
  userController.deleteUserWithoudPost(req, res)
);

export default router;
