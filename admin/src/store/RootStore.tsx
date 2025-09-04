import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "../toolkit/UserSlicer";
import BrandSlicer from "../toolkit/brandSlicer";
import CustomerSlicer from "../toolkit/customerSlicer";
import PartnerSlicer from "../toolkit/partnerSlicer";
import AuctionSlicer from "../toolkit/auctionSlicer";
import AdminSlicer from "../toolkit/adminSlicer";
import BlogSlicer from "../toolkit/blogSlicer";
import LogisticSlicer from "../toolkit/logisticSlicer";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
    brand: BrandSlicer,
    customer:CustomerSlicer,
    partner:PartnerSlicer,
    auction:AuctionSlicer,
    blog:BlogSlicer,
    logistic:LogisticSlicer,
    admin:AdminSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
