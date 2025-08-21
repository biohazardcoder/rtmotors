import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user:{
        avatar:{type: String, required: true},
        name:{type:String, required: true},
        email:{type:String, required: true},
        id:{type: String, required: true}
    },
    orderId:{type: String, required: true, unique: true},
    status:{type: String, default:"pending"},
    trackingNumber:{type: String, required: true},
    car:{type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true},
    contact:{type: String, required: true}
},{timestamps: true});


export default mongoose.model("Order", OrderSchema);