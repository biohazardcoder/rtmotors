import mongoose from "mongoose";
const CarSchema = new mongoose.Schema({
        name: { type: String, required: true },
        images: { type: [String], required: true },
        video:{type:String},
        brand: { type: String, required: true },
        description: { type: String, required: true },
        oldPrice: { type: Number},
        currentPrice: { type: Number, required: true },
        miles: { type: Number, required: true },
        fuelType: { type: String, required: true },
        transmission: { type: String, required: true },
        year: { type: Number, required: true },
        stock: { type: Number, required: true },
        comments: [
            {
                user:{
                    name: { type: String, required: true },
                    userId: { type: String, required: true },
                    avatar : { type: String, required: true },
                },
                message: { type: String, required: true },
                rating: { type: Number, required: true },
                createdAt: { type: Date, default: Date.now },
            }
        ],
        status: {
            color: { type: String, enum: ["fff", "000"], default: "fff" },
            bg: { type: String, default: "00f" },
            text: { type: String, default:""},
        },
        type: { type: String, enum: ["new", "used"], required: true },
    },
);

export default mongoose.model("Car", CarSchema)