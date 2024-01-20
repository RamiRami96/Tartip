import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateMenu } from "../initialStates/menuState";

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialStateMenu,
  reducers: {
    openMenu: (
      state,
      action: PayloadAction<{
        boardId: number;
        todoId: number | null;
      }>
    ) => {
      const { boardId, todoId = null } = action.payload;
      state.isMenuOpen = true;
      state.boardId = boardId;
      state.todoId = todoId;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;
