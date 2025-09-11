import type {  CarTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface CarState {
  data: CarTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: CarState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const CarSlacer = createSlice({
  name: "Car",
  initialState,
  reducers: {
    setCar(state, { payload }: PayloadAction<CarTypes[]>) {
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

export const { setCar,setLoading, setError } = CarSlacer.actions;
export default CarSlacer.reducer;
