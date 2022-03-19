import { createSlice } from "@reduxjs/toolkit";

interface DemoType {
   demoType: "" | "instructor" | "trainer";
}

const initialState: DemoType = {
   demoType: "",
};

export const demoSlice = createSlice({
   name: "demo",
   initialState,
   reducers: {
      toggleDemo(state, action: { payload: "instructor" | "trainer" | "" }) {
         state.demoType = action.payload;
         return state;
      },
   },
});

export default demoSlice.reducer;
export const { toggleDemo } = demoSlice.actions;
