import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getFavoriteSongs, toggleFavoriteSong } from "../controller/favorite.controller.js";

const router = Router();

router.use(protectRoute);
router.get("/:user", getFavoriteSongs);
router.post("/", toggleFavoriteSong);

export default router;