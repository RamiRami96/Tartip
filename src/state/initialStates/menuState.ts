export interface MenuState {
  isMenuOpen: boolean;
  boardId: number | null;
  todoId: number | null;
}

export const initialStateMenu: MenuState = {
  isMenuOpen: false,
  boardId: null,
  todoId: null,
};
