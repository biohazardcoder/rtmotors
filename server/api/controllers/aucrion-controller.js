import Auction from '../models/auction-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop(); 
}

export const getAllAuction = async (_, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Problem get auctions" });
    }
};

export const createAuction = async (req, res) => {
    try {
        const { url } = req.body;
        const auction = new Auction({
            url,
            image: req.uploadedImages[0], 
        });
        await auction.save();
        res.status(201).json(auction);
    } catch (error) {
        res.status(400).json({ message: "Problem creating auction" });
    }
};

export const updateAuction = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        let updatedData = req.body;

        if (req.uploadedImages && req.uploadedImages[0]) {
            if (auction.image) {
                const fileName = getFileNameFromUrl(auction.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedAuction = await Auction.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedAuction);
    } catch (error) {
        res.status(400).json({ message: "Problem updating auction" });
    }
};

export const deleteAuction = async (req, res) => {
    try {
        const auction = await Auction.findByIdAndDelete(req.params.id);
        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        if (auction.image) {
            const fileName = getFileNameFromUrl(auction.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Auction deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting auction" });
    }
};
