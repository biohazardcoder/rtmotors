import type {  BrandTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface BrandState {
  data: BrandTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: BrandState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const BrandSlicer = createSlice({
  name: "Brand",
  initialState,
  reducers: {
    setBrand(state, { payload }: PayloadAction<BrandTypes[]>) {
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

export const { setBrand,setLoading, setError } = BrandSlicer.actions;
export default BrandSlicer.reducer;
