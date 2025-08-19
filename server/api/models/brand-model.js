import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: true,
    },
    url:{
             type: String,
        required: true,
    }
},{timestamps: true});


export default mongoose.model("Brand", BrandSchema);