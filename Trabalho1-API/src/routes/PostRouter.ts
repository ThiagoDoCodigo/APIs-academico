import { Router } from "express";
import { PostController } from "../controller/PostController";
const postController = new PostController();

const router: Router = Router();

router.get("/", (req, res) => postController.getPostAll(req, res));
router.post("/newPost", (req, res) => postController.addPost(req, res));
router.patch("/patch/idPost/:idPost/idUser/:idUser", (req, res) =>
  postController.patchPost(req, res)
);
router.delete("/delete/idPost/:idPost/idUser/:idUser", (req, res) =>
  postController.deletePost(req, res)
);

export default router;
