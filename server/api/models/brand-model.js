import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    width:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
},{timestamps: true});


export default mongoose.model("Brand", BrandSchema); 