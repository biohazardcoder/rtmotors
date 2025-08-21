import express from "express";

import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { getAllLogistic,createLogistic,deleteLogistic,updateLogistic } from "../controllers/logistic-controller.js";

const router = express.Router();

router.get("/", getAllLogistic);
router.post("/", isExisted, uploadImage, createLogistic);
router.put("/:id", isExisted, uploadImage, updateLogistic);
router.delete("/:id", isExisted, deleteLogistic);

export default router;
