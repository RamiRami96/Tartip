import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: { boards: boardSlice, modal: modalSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
