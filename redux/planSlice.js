import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
  name: "plans",
  initialState: {
    Plans: [],
  },
  reducers: {
    planSetter: (state, payload) => {
      state.plans.push(payload);
    },
  },
});

export const { planSetter } = planSlice.actions;
export default planSlice.reducer;
