import express from "express";
import {
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/customer-controller.js";
import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";

const router = express.Router();

router.get("/", getAllCustomer);
router.post("/", isExisted, uploadImage, createCustomer);
router.put("/:id", isExisted, uploadImage, updateCustomer);
router.delete("/:id", isExisted, deleteCustomer);

export default router;
