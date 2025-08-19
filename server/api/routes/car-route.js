import express from "express";
import {
  getAllCar,
  getCarById,
  createCar,
  updateCar,
  deleteCar
} from "../controllers/car-controller.js";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = express.Router();

router.get("/", getAllCar);
router.get("/:id", getCarById);
router.post("/", isExisted, uploadImage, createCar);
router.put("/:id", isExisted, uploadImage, updateCar);
router.delete("/:id", isExisted, deleteCar);

export default router;
