import { clerkClient } from "@clerk/express";
import Order from "../models/order-model.js";

export const getAllOrders = async (_,res)=>{
    try {
        const orders = await Order.find().populate("car");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Problem getting orders" });
    }
};

export const createOrder = async (req, res) => {
    try {
        const {userId, car, trackingNumber, contact} = req.body;
        const user = await clerkClient.users.getUser(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newOrder = new Order({
            user: {
                avatar: user.imageUrl,
                name: user.fullName,
                email: user.emailAddresses[0].emailAddress,
                id: user.id
            },
            car,
            trackingNumber,
            contact,
            orderId: Math.random().toString(36).substring(2, 8)
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({savedOrder});
    } catch (error) {
        res.status(500).json({ message: "Problem creating order" });
    }
};


export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: "Problem updating order" });
    }
};


export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await Order.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Problem deleting order" });
    }
};