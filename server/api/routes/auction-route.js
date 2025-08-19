import express from "express";

import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { getAllAuction,createAuction,deleteAuction,updateAuction } from "../controllers/aucrion-controller.js";

const router = express.Router();

router.get("/", getAllAuction);
router.post("/", isExisted, uploadImage, createAuction);
router.put("/:id", isExisted, uploadImage, updateAuction);
router.delete("/:id", isExisted, deleteAuction);

export default router;
