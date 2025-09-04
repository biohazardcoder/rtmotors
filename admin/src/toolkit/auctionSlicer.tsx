import type {  AuctionTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface AuctionState {
  data: AuctionTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: AuctionState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const AuctionSlacer = createSlice({
  name: "Auction",
  initialState,
  reducers: {
    setAuction(state, { payload }: PayloadAction<AuctionTypes[]>) {
      state.data = payload;
      state.loading = false;
      state.isAuth = true;
      state.error = "";
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
      state.loading = false;
      state.isAuth = false;
    },
  },
});

export const { setAuction,setLoading, setError } = AuctionSlacer.actions;
export default AuctionSlacer.reducer;
