import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  role: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "adminState",
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.role = action.payload.admin.role;
      state.isAuthenticated = true;
    },
    setAdminLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions;
export default adminSlice.reducer;
