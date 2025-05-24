import { Router } from "express";
import { getAllSongs, getSongsByAlbumId, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, getSongsByArtistId } from "../controller/song.controller.js";

const router = Router();

router.get("/", getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);
router.get("/album/:albumId", getSongsByAlbumId);
router.get("/artist/:artistId", getSongsByArtistId);

export default router;
