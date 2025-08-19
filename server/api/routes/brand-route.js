import express from "express";
import {
    getAllBrand ,
    createBrand,
    updateBrand,
    deleteBrand
} from "../controllers/brand-controller.js";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = express.Router();

router.get("/", getAllBrand);
router.post("/", isExisted, uploadImage, createBrand);
router.put("/:id", isExisted, uploadImage, updateBrand);
router.delete("/:id", isExisted, deleteBrand);

export default router;
