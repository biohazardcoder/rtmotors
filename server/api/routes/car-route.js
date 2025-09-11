import express from "express";
import {
  getAllCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  AddCommentary,
  deleteComment,
  AddVideo,
  DeleteVideo
} from "../controllers/car-controller.js";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import uploadVideo from "../../middlewares/uploadVideo.js";

const router = express.Router();

router.get("/", getAllCar);
router.get("/:id", getCarById);
router.post("/", isExisted, uploadImage, createCar);
router.post("/comment", AddCommentary);
router.put("/video/:id", isExisted, uploadVideo, AddVideo);
router.delete("/video/:id", isExisted, DeleteVideo);
router.put("/:id", isExisted, uploadImage, updateCar);
router.delete("/:id", isExisted, deleteCar);
router.delete("/:id/comment/:commentId", deleteComment);

export default router;
