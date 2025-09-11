import express from "express";

import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { getAllLogistic,createLogistic,deleteLogistic,updateLogistic, DeleteVideo, AddVideo } from "../controllers/logistic-controller.js";
import uploadVideo from "../../middlewares/uploadVideo.js";

const router = express.Router();

router.get("/", getAllLogistic);
router.post("/", isExisted, uploadImage, createLogistic);
router.put("/:id", isExisted, uploadImage, updateLogistic);
router.put("/video/:id", isExisted, uploadVideo, AddVideo);
router.delete("/video/:id", isExisted, DeleteVideo);
router.delete("/:id", isExisted, deleteLogistic);

export default router;
