import { Router, Request, Response } from "express";
import { PostController } from "../controller/PostController";
const postController = new PostController();

const router: Router = Router();

router.get("/", (req: Request, res: Response) =>
  postController.getPostAll(req, res)
);
router.post("/newPost", (req: Request, res: Response) =>
  postController.addPost(req, res)
);
router.patch(
  "/patch/idPost/:idPost/idUser/:idUser",
  (req: Request, res: Response) => postController.patchPost(req, res)
);
router.delete(
  "/delete/idPost/:idPost/idUser/:idUser",
  (req: Request, res: Response) => postController.deletePost(req, res)
);

export default router;
