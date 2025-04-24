import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // "dark" mode can be toggled
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setMode: (state, action) => {
      state.mode = action.payload; // Allows setting mode explicitly
    },
  },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
