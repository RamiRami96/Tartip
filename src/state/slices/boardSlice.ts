import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";
import { generateUniqueId } from "../../helpers/generateUniqueId";
import { initialStateBoard } from "../initialStates/boardState";

export const boardSlice = createSlice({
  name: "board",
  initialState: initialStateBoard,
  reducers: {
    setBoard: (
      state,
      action: PayloadAction<{
        board: Board;
      }>
    ) => {
      const { board } = action.payload;
      state.boards = [...state.boards, board];
      state.currentBoard = null;
      state.currentTodo = null;
    },
    editBoard: (
      state,
      action: PayloadAction<{ boardId: number; newBoardName: string }>
    ) => {
      const { boardId, newBoardName } = action.payload;

      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );

      if (boardIndex !== -1) {
        state.boards[boardIndex].name = newBoardName;
        state.currentBoard = null;
        state.currentTodo = null;
      }
    },

    deleteBoard: (state, action: PayloadAction<{ boardId: number }>) => {
      const { boardId } = action.payload;

      const boardIndex = state.boards.findIndex(
        (board) => board.id === boardId
      );

      if (boardIndex !== -1) {
        state.boards.splice(boardIndex, 1);
        state.currentBoard = null;
        state.currentTodo = null;
      }
    },
    moveTodo: (
      state,
      action: PayloadAction<{
        sourceBoardId: number;
        sourceTodoId: number;
        targetBoard: Board;
        targetTodo: Todo | null;
      }>
    ) => {
      const { sourceBoardId, sourceTodoId, targetBoard, targetTodo } =
        action.payload;

      const targetTodoIndex = targetTodo
        ? targetBoard.todos.findIndex((todo: Todo) => todo.id === targetTodo.id)
        : -1;

      const sourceBoardIndex = state.boards.findIndex(
        (col) => col.id === sourceBoardId
      );
      const targetBoardIndex = state.boards.findIndex(
        (col) => col.id === targetBoard.id
      );

      const draggedTodo = state.boards[sourceBoardIndex].todos.find(
        (todo) => todo.id === sourceTodoId
      )!;

      state.boards[sourceBoardIndex].todos = state.boards[
        sourceBoardIndex
      ].todos.filter((todo) => todo.id !== sourceTodoId);

      state.currentBoard = null;
      state.currentTodo = null;

      if (targetTodo !== null) {
        state.boards[targetBoardIndex].todos.splice(
          targetTodoIndex,
          0,
          draggedTodo
        );
      } else {
        const newTodo = { id: generateUniqueId(), title: draggedTodo.title };
        state.boards[targetBoardIndex].todos.push(newTodo);
      }
    },
    setTodo: (
      state,
      action: PayloadAction<{
        newTodo: Todo;
      }>
    ) => {
      const { newTodo } = action.payload;
      const boardId = current(state.currentBoard)?.id;

      if (boardId) {
        const boardIndex = state.boards.findIndex((col) => col.id === boardId);
        state.boards[boardIndex].todos = [
          newTodo,
          ...state.boards[boardIndex].todos,
        ];
        state.currentBoard = null;
        state.currentTodo = null;
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{
        boardId: number;
        todoId: number;
        title: string;
      }>
    ) => {
      const { boardId, todoId, title } = action.payload;

      const boardIndex = state.boards.findIndex((col) => col.id === boardId);
      const todoIndex = state.boards[boardIndex].todos.findIndex(
        (todo) => todo.id === todoId
      );

      if (todoIndex !== -1) {
        state.boards[boardIndex].todos[todoIndex].title = title;
        state.currentBoard = null;
        state.currentTodo = null;
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<{
        boardId: number;
        todoId: number;
      }>
    ) => {
      const { boardId, todoId } = action.payload;

      const boardIndex = state.boards.findIndex((col) => col.id === boardId);
      const todoIndex = state.boards[boardIndex].todos.findIndex(
        (todo) => todo.id === todoId
      );

      if (todoIndex !== -1) {
        state.boards[boardIndex].todos.splice(todoIndex, 1);
        state.currentBoard = null;
        state.currentTodo = null;
      }
    },
    setCurrentBoard: (
      state,
      action: PayloadAction<{
        currentBoard: Board | null;
      }>
    ) => {
      const { currentBoard } = action.payload;
      state.currentBoard = currentBoard;
    },
    setCurrentTodo: (
      state,
      action: PayloadAction<{
        currentTodo: Todo | null;
      }>
    ) => {
      const { currentTodo } = action.payload;
      state.currentTodo = currentTodo;
    },
  },
});

export const {
  setBoard,
  editBoard,
  deleteBoard,
  moveTodo,
  setTodo,
  editTodo,
  deleteTodo,
  setCurrentBoard,
  setCurrentTodo,
} = boardSlice.actions;

export default boardSlice.reducer;
