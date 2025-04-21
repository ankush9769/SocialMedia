import {Router} from 'express';
import { protect } from "../middleware/authmiddleware.js";
import {createpost , getallpost , likepost ,commentonpost, profile } from '../Controllers/postcontroller.js';

const router = Router();

router.post("/create",protect,createpost);
router.get("/",protect,getallpost);
router.post("/like/:postId",protect,likepost);
router.post("/comment/:postId",protect,commentonpost);
router.get("/profile",protect,profile)

export default router;

