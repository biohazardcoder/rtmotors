import type {  PartnerTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface PartnerState {
  data: PartnerTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: PartnerState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const PartnerSlacer = createSlice({
  name: "Partner",
  initialState,
  reducers: {
    setPartner(state, { payload }: PayloadAction<PartnerTypes[]>) {
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

export const { setPartner,setLoading, setError } = PartnerSlacer.actions;
export default PartnerSlacer.reducer;
