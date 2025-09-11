import mongoose from "mongoose";

const LogisticSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    video:{
        type: String,
    },
},{timestamps: true});


export default mongoose.model("Logistic", LogisticSchema);