import type {  CustomerTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface CustomerState {
  data: CustomerTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: CustomerState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const CustomerSlicer = createSlice({
  name: "Customer",
  initialState,
  reducers: {
    setCustomer(state, { payload }: PayloadAction<CustomerTypes[]>) {
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

export const { setCustomer,setLoading, setError } = CustomerSlicer.actions;
export default CustomerSlicer.reducer;
