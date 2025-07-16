// Error messages
export const ERROR_MESSAGES = {
  VALUE_REQUIRED: "value required!",
  UNEXPECTED_ERROR: "Oops.. something unexpected happened :(",
} as const;

// Action button text
export const ACTION_BUTTONS = {
  ADD: "Add",
  EDIT: "Edit",
  DELETE: "Delete",
} as const;

// Modal titles
export const MODAL_TITLES = {
  ADD_NEW_BOARD: "Add new board",
  EDIT_DELETE_BOARD: "Edit/Delete Board",
  ADD_NEW_TODO: "Add new todo",
  EDIT_DELETE_TODO: "Edit/Delete todo",
} as const;

// Modal placeholders
export const MODAL_PLACEHOLDERS = {
  ENTER_BOARD_TITLE: "Enter title of board",
  ENTER_TODO_TITLE: "Enter title of todo",
} as const;

// UI button text
export const UI_BUTTONS = {
  ADD_TODO: "Add todo",
  ADD_BOARD: "Add board",
} as const;

// Modal modes
export const MODAL_MODES = {
  ADD_BOARD: "addBoard",
  EDIT_BOARD: "editBoard",
  ADD_TODO: "addTodo",
  EDIT_TODO: "editTodo",
  DEFAULT: "default",
} as const; 