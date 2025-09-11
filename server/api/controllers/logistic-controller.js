import Logistic from '../models/logistic-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");
const VIDEOS_DIR = path.resolve("uploads/videos");

function getFileNameFromUrl(url) {
    return url.split("/").pop(); 
}

export const getAllLogistic = async (_, res) => {
    try {
        const logistics = await Logistic.find();
        res.status(200).json(logistics);
    } catch (error) {
        res.status(500).json({ message: "Problem get logistics" });
    }
};

export const createLogistic = async (req, res) => {
    try {
        const logistic = new Logistic({
            image: req.uploadedImages[0], 
        });
        await logistic.save();
        res.status(201).json(logistic);
    } catch (error) {
        res.status(400).json({ message: "Problem creating logistic" });
    }
};

export const updateLogistic = async (req, res) => {
    try {
        const logistic = await Logistic.findById(req.params.id);
        if (!logistic) {
            return res.status(404).json({ message: "Logistic not found" });
        }

        let updatedData = req.body;

        if (req.uploadedImages && req.uploadedImages[0]) {
            if (logistic.image) {
                const fileName = getFileNameFromUrl(logistic.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedLogistic = await Logistic.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedLogistic);
    } catch (error) {
        res.status(400).json({ message: "Problem updating logistic" });
    }
};

export const deleteLogistic = async (req, res) => {
    try {
        const logistic = await Logistic.findByIdAndDelete(req.params.id);
        if (!logistic) {
            return res.status(404).json({ message: "Logistic not found" });
        }

        if (logistic.image) {
            const fileName = getFileNameFromUrl(logistic.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Logistic deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting logistic" });
    }
};


export const AddVideo = async (req, res) => {
    try {
        const logistic = await Logistic.findById(req.params.id);
        if (!logistic) {
            return res.status(404).json({ message: "Logistic not found" });
        }

        if (req.uploadedVideo && req.uploadedVideo[0]) {
            if (logistic.video) {
                const fileName = getFileNameFromUrl(logistic.video);
                const oldVideoPath = path.join(VIDEOS_DIR, fileName);

                try {
                    await fs.unlink(oldVideoPath);
                } catch (err) {
                    console.error("Error deleting old video:", err.message);
                }
            }
            logistic.video = req.uploadedVideo;

        }
        
        await logistic.save();
        res.status(200).json(logistic);
    } catch (error) {
        res.status(400).json({ message: "Problem adding video" });
    }
}

export const DeleteVideo = async (req, res) => {
    try {
        const logistic = await Logistic.findById(req.params.id);
        if (!logistic) {
            return res.status(404).json({ message: "Logistic not found" });
        }

        if (logistic.video) {
            const fileName = getFileNameFromUrl(logistic.video);
            const videoPath = path.join(VIDEOS_DIR, fileName);

            try {
                await fs.unlink(videoPath);
            } catch (err) {
                console.error("Error deleting video file:", err.message);
            }
        }

        


        logistic.video = null;
        await logistic.save();
        res.status(200).json(logistic);
    } catch (error) {
        res.status(400).json({ message: "Problem deleting video" });
        console.log(error);
        
    }
}