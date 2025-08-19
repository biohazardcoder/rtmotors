import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {clerkClient} from "@clerk/express"

import AdminRoute from "./api/routes/admin-route.js"
import BrandRoute from "./api/routes/brand-route.js"
import CarRoute from "./api/routes/car-route.js"
import PartnerRoute from "./api/routes/partner-route.js"
import AuctionRoute from "./api/routes/auction-route.js"
import isExisted from "./middlewares/isExisted.js"

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json());
app.use("/api/uploads", express.static("uploads"));

app.get("/api", (_, res) => {
  res.send("Hello World!")
})
app.use("/api/admin", AdminRoute)
app.use("/api/brand", BrandRoute);
app.use("/api/partner", PartnerRoute);
app.use("/api/car", CarRoute);
app.use("/api/auction", AuctionRoute);
app.get("/api/user", isExisted, async (_, res) => {
  const {data} = await clerkClient.users.getUserList();

  const users = data.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddresses[0].emailAddress,
    createdAt: user.createdAt,
    avatar: user.imageUrl,
  }));

  res.status(200).json(users);
});
const PORT = process.env.PORT || 3000
const MongoDB = process.env.MongoDB || "mongodb://localhost:27017/rtmotors"


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
mongoose.connect(MongoDB, console.log("✅ MongoDB connected"))
