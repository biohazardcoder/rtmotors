import type {  AdminTypes } from "@/types/RootTypes";
import { createSlice, type PayloadAction, } from "@reduxjs/toolkit";

interface AdminState {
  data: AdminTypes[] | [];
  loading: boolean;
  error: string;
  isAuth: boolean;
}

const initialState: AdminState = {
  data: [],
  loading: false,
  error: "",
  isAuth: false,
};

const AdminSlacer = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setAdmin(state, { payload }: PayloadAction<AdminTypes[]>) {
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

export const { setAdmin,setLoading, setError } = AdminSlacer.actions;
export default AdminSlacer.reducer;
