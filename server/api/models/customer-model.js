import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: true,
    },
    job:{
             type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    }
},{timestamps: true});


export default mongoose.model("Customer", CustomerSchema);