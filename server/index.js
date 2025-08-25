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
import LogisticRoute from "./api/routes/logistic-route.js"
import CustomerRoute from "./api/routes/customer-route.js"
import OrderRoute from "./api/routes/order-route.js"
import BlogRoute from "./api/routes/blog-route.js"
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
app.use("/api/customer", CustomerRoute);
app.use("/api/auction", AuctionRoute);
app.use("/api/logistic", LogisticRoute);
app.use("/api/order", OrderRoute);
app.use("/api/blog", BlogRoute);
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
app.get("/api/exchange", async (_, res) => {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    res.json({
      rates: {
        RUB: data.rates.RUB,
        KRW: data.rates.KRW,
        UZS: data.rates.UZS,
        EUR: data.rates.EUR,
        CNY: data.rates.CNY,
      },
      time: data.time_last_update_utc,
    });
  } catch (error) {
    res.status(500).json({ error: "API’dan ma’lumot olishda xato" });
  }
});
const PORT = process.env.PORT || 3000
const MongoDB = process.env.MongoDB || "mongodb://localhost:27017/rtmotors"


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
mongoose.connect(MongoDB, console.log("✅ MongoDB connected"))
