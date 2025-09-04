import express from "express";
import {
    getAllCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/customer-controller.js";
import isExisted from "../../middlewares/isExisted.js";

const router = express.Router();

router.get("/", getAllCustomer);
router.post("/", isExisted, createCustomer);
router.put("/:id", isExisted, updateCustomer);
router.delete("/:id", isExisted, deleteCustomer);

export default router;
