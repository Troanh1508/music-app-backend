import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
	try {
		// -1 = Descending => newest -> oldest
		// 1 = Ascending => oldest -> newest
		const songs = await Song.find().populate("artist").populate("album").sort({ createdAt: -1 });
		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getSongsByAlbumId = async (req, res, next) => {
    const { albumId } = req.params;
    try {
        const songs = await Song.find({ album: albumId }).populate("artist").populate("album").sort({ createdAt: -1 });
        res.json(songs);
    } catch (error) {
        next(error);
    }
}

export const getSongsByArtistId = async (req, res, next) => {
    const { artistId } = req.params;
    try {
        const songs = await Song.find({ artist: artistId }).populate("artist").populate("album").sort({ createdAt: -1 });
        res.json(songs);
    }
    catch (error) {
        next(error);
    }
}

export const getFeaturedSongs = async (req, res, next) => {
	try {
		// fetch 6 random songs
		const songs = await Song.aggregate([
            { $sample: { size: 6 } },
            {
                $lookup: {
                    from: "artists", // collection name in MongoDB (usually plural, check your DB)
                    localField: "artist",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            { $unwind: "$artist" }, // optional: if you want artist as an object, not array
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getMadeForYouSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
            { $sample: { size: 4 } },
            {
                $lookup: {
                    from: "artists", // collection name in MongoDB (usually plural, check your DB)
                    localField: "artist",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            { $unwind: "$artist" }, // optional: if you want artist as an object, not array
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};

export const getTrendingSongs = async (req, res, next) => {
	try {
		const songs = await Song.aggregate([
            { $sample: { size: 4 } },
            {
                $lookup: {
                    from: "artists", // collection name in MongoDB (usually plural, check your DB)
                    localField: "artist",
                    foreignField: "_id",
                    as: "artist"
                }
            },
            { $unwind: "$artist" }, // optional: if you want artist as an object, not array
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ]);

		res.json(songs);
	} catch (error) {
		next(error);
	}
};
