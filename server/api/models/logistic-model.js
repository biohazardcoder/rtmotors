import mongoose from "mongoose";

const LogisticSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    }
},{timestamps: true});


export default mongoose.model("Logistic", LogisticSchema);