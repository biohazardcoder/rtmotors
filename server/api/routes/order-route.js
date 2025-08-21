import express from "express";

import isExisted from "../../middlewares/isExisted.js";
import uploadImage from "../../middlewares/uploadImage.js";
import { createOrder,getAllOrders,updateOrder,deleteOrder} from "../controllers/order-controller.js.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/", isExisted, uploadImage, createOrder);
router.put("/:id", isExisted, uploadImage, updateOrder);
router.delete("/:id", isExisted, deleteOrder);

export default router;
