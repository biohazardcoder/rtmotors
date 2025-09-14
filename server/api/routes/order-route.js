import express from "express";

import isExisted from "../../middlewares/isExisted.js";
import { createOrder,getAllOrders,updateOrder,deleteOrder,getMyOrder} from "../controllers/order-controller.js.js";

const router = express.Router();

router.get("/", getAllOrders);
router.post("/",  createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", isExisted, deleteOrder);
router.get("/my-orders/:userId", getMyOrder);

export default router;
