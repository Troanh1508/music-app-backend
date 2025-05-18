import {Favorite} from "../models/favorite.model.js";
import { Song } from "../models/song.model.js";

export const addFavoriteSong = async (req, res, next) => {
    
  try {
    const { user, song } = req.body;
    const exists = await Favorite.findOne({ user, song });
    if (exists) return res.status(400).json({ error: 'Already favorited' });

    const favorite = new Favorite({ user, song });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    next(error);
  }

}

export const getFavoriteSongs = async (req, res, next) => {
    try {
        const {user} = req.params;

        const favorites = await Favorite.find({ user: user }).populate("song");
        const favoriteSongs = await Song.find({ _id: { $in: favorites.map(fav => fav.song) } }).populate("artist").populate("album");

        res.status(200).json({favorites, favoriteSongs});
    } catch (error) {
        next(error);
    }
}

export const removeFavoriteSong = async (req, res, next) => {
    
try {
    const { user, song } = req.params;
    const deletedFavorite = await Favorite.findOneAndDelete({ user, song });

    if (!deletedFavorite) {
        return res.status(404).json({ message: "Favorite not found" }); // Handle case where no record is found
    }
    
    res.status(200).json({message: "Song removed from favorites"});
  } catch (error) {
    next(error);
  }

}