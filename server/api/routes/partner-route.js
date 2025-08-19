import express from "express";
import {
    getAllPartner ,
    createPartner,
    updatePartner,
    deletePartner
} from "../controllers/partner-controller.js";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = express.Router();

router.get("/", getAllPartner);
router.post("/", isExisted, uploadImage, createPartner);
router.put("/:id", isExisted, uploadImage, updatePartner);
router.delete("/:id", isExisted, deletePartner);

export default router;
