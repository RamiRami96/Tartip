import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import menuSlice from "./slices/menuSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
  reducer: { boards: boardSlice, modal: modalSlice, menu: menuSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
