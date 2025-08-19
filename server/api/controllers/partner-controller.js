import Partner from '../models/partner-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
    return url.split("/").pop(); 
}

export const getAllPartner = async (_, res) => {
    try {
        const partners = await Partner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Problem get partners" });
    }
};

export const createPartner = async (req, res) => {
    try {
        const {  url } = req.body;
        const partner = new Partner({
            url,
            image: req.uploadedImages[0], 
        });
        await partner.save();
        res.status(201).json(partner);
    } catch (error) {
        res.status(400).json({ message: "Problem creating partner" });
    }
};

export const updatePartner = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        let updatedData = req.body;

        if (req.uploadedImages && req.uploadedImages[0]) {
            if (partner.image) {
                const fileName = getFileNameFromUrl(partner.image);
                const oldImagePath = path.join(IMAGES_DIR, fileName);

                try {
                    await fs.unlink(oldImagePath);
                } catch (err) {
                    console.error("Error deleting old image:", err.message);
                }
            }
            updatedData.image = req.uploadedImages[0];
        }

        const updatedPartner = await Partner.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(400).json({ message: "Problem updating partner" });
    }
};

export const deletePartner = async (req, res) => {
    try {
        const partner = await Partner.findByIdAndDelete(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        if (partner.image) {
            const fileName = getFileNameFromUrl(partner.image);
            const imagePath = path.join(IMAGES_DIR, fileName);

            try {
                await fs.unlink(imagePath);
            } catch (err) {
                console.error("Error deleting image file:", err.message);
            }
        }

        res.status(200).json({ message: "Partner deleted" });
    } catch (error) {
        res.status(400).json({ message: "Problem deleting partner" });
    }
};
