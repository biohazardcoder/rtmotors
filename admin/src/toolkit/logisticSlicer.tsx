import type {  LogisticTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface LogisticeState {
  data: LogisticTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: LogisticeState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const LogisticSlacer = createSlice({
  name: "Logistic",
  initialState,
  reducers: {
    setLogistic(state, { payload }: PayloadAction<LogisticTypes[]>) {
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

export const { setLogistic,setLoading, setError } = LogisticSlacer.actions;
export default LogisticSlacer.reducer;
