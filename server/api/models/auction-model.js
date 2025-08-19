import mongoose from "mongoose";

const AuctionSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    url:{
             type: String,
        required: true,
    }
},{timestamps: true});


export default mongoose.model("Auction", AuctionSchema);