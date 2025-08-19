import Brand from '../models/brand-model.js';
import fs from "fs/promises";
import path from "path";

const IMAGES_DIR = path.resolve("uploads/images");

function getFileNameFromUrl(url) {
  return url.split("/").pop(); 
}

export const getAllBrand = async (_, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Problem get brands" });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { title, url } = req.body;
    const brand = new Brand({
      title,
      url,
      image: req.uploadedImages[0], 
    });
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ message: "Problem creating brand" });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    let updatedData = req.body;

    if (req.uploadedImages && req.uploadedImages[0]) {
      if (brand.image) {
        const fileName = getFileNameFromUrl(brand.image);
        const oldImagePath = path.join(IMAGES_DIR, fileName);

        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.error("Error deleting old image:", err.message);
        }
      }
      updatedData.image = req.uploadedImages[0];
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: "Problem updating brand" });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    if (brand.image) {
      const fileName = getFileNameFromUrl(brand.image);
      const imagePath = path.join(IMAGES_DIR, fileName);

      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Error deleting image file:", err.message);
      }
    }

    res.status(200).json({ message: "Brand deleted" });
  } catch (error) {
    res.status(400).json({ message: "Problem deleting brand" });
  }
};
