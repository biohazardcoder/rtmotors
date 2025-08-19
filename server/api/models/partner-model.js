import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    url:{
             type: String,
        required: true,
    }
},{timestamps: true});


export default mongoose.model("Partner", PartnerSchema);