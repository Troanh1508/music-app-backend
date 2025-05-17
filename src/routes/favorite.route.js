import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addFavoriteSong, getFavoriteSongs, removeFavoriteSong } from "../controller/favorite.controller.js";

const router = Router();

router.use(protectRoute);
router.post("/", addFavoriteSong);
router.get("/:user", getFavoriteSongs);
router.delete("/:user/:song", removeFavoriteSong);

export default router;