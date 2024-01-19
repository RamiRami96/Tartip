import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuState {
  isMenuOpen: boolean;
  boardId: number | null;
  todoId: number | null;
}

const initialState: MenuState = {
  isMenuOpen: false,
  boardId: null,
  todoId: null,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
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
