import { BoardTitle } from "./BoardTitle";
import TodoComponent from "../Todo";

import {
  deleteBoard,
  deleteTodo,
  moveTodo,
  setCurrentBoard,
  setCurrentTodo,
} from "../../state/slices/boardSlice";
import { openModal } from "../../state/slices/modalSlice";
import { closeMenu } from "../../state/slices/menuSlice";

import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";
import { useAppDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { Dispatch } from "react";

function BoardComponent() {
  const dispatch = useAppDispatch();

  const { boards, currentBoard, currentTodo } = useTypedSelector(
    (state) => state.boards
  );

  const onDragStart = (board: Board, todo: Todo, dispatch: Dispatch<any>) => {
    dispatch(setCurrentBoard({ currentBoard: board }));
    dispatch(setCurrentTodo({ currentTodo: todo }));
  };

  const onDrop = (
    e: React.DragEvent<HTMLLIElement>,
    targetBoard: Board,
    targetTodo: Todo | null,
    dispatch: Dispatch<any>
  ) => {
    e.preventDefault();

    const targetElement = e.currentTarget as HTMLLIElement;
    targetElement.style.borderColor = "#fff";

    if (currentBoard && currentTodo) {
      const sourceBoardId = currentBoard.id;
      const sourceTodoId = currentTodo.id;

      dispatch(
        moveTodo({
          sourceBoardId,
          sourceTodoId,
          targetBoard,
          targetTodo,
        })
      );
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    const isTodoItem = e.currentTarget.dataset.item === "todo";

    if (isTodoItem) {
      const targetElement = e.currentTarget as HTMLLIElement;
      targetElement.style.borderColor = "#9999EA";
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    const targetElement = e.currentTarget as HTMLLIElement;
    targetElement.style.borderColor = "#fff";
  };

  const addBoard = (dispatch: Dispatch<any>) => {
    dispatch(
      openModal({
        modalTitle: "Add new board",
        modalPlaceholder: "Enter title of board",
        modalMode: "addBoard",
      })
    );
  };

  const onEditBoard = (board: Board, dispatch: Dispatch<any>) => {
    dispatch(setCurrentBoard({ currentBoard: board }));

    dispatch(
      openModal({
        modalTitle: "Edit board",
        modalPlaceholder: "Enter new title of board",
        modalMode: "editBoard",
        buttonText: "Edit",
      })
    );

    dispatch(closeMenu());
  };

  const onDeleteBoard = (boardId: number, dispatch: Dispatch<any>) => {
    dispatch(deleteBoard({ boardId }));
    dispatch(closeMenu());
  };

  const addTodo = (currentBoard: Board, dispatch: Dispatch<any>) => {
    dispatch(setCurrentBoard({ currentBoard }));

    dispatch(
      openModal({
        modalTitle: "Add new todo",
        modalPlaceholder: "Enter title of todo",
        modalMode: "addTodo",
      })
    );
  };

  const onEditTodo = (board: Board, todo: Todo, dispatch: Dispatch<any>) => {
    dispatch(setCurrentBoard({ currentBoard: board }));
    dispatch(setCurrentTodo({ currentTodo: todo }));

    dispatch(
      openModal({
        modalTitle: "Edit todo",
        modalPlaceholder: "Enter new title of todo",
        modalMode: "editTodo",
        buttonText: "Edit",
      })
    );
  };

  const onDeleteTodo = (
    boardId: number,
    todoId: number,
    dispatch: Dispatch<any>
  ) => {
    dispatch(deleteTodo({ boardId, todoId }));
  };

  return (
    <div className="mt-16">
      <ul className="flex overflow-x-auto pb-3 ">
        <>
          {boards.map((board) => (
            <li
              key={board.id}
              className="border border-[#9333EA] flex flex-col justify-between rounded p-3 mr-4 min-w-60 max-w-60"
            >
              <BoardTitle
                id={board.id}
                title={board.name}
                onEdit={() => onEditBoard(board, dispatch)}
                onDelete={() => onDeleteBoard(board.id, dispatch)}
              />
              <div className="overflow-y-auto p-2 px-2 h-[55vh]">
                <button
                  className="bg-[#9333EA] height-[65.6px] text-white font-bold rounded p-4 mb-2 w-full"
                  onClick={() => addTodo(board, dispatch)}
                >
                  Add todo
                </button>
                <ul>
                  {board.todos.map((todo) => (
                    <TodoComponent
                      key={todo.id}
                      todo={todo}
                      board={board}
                      onDragStart={() => onDragStart(board, todo, dispatch)}
                      onDrop={(e) => onDrop(e, board, todo, dispatch)}
                      onDragOver={onDragOver}
                      onDragEnd={onDragEnd}
                      onEdit={onEditTodo}
                      onDelete={onDeleteTodo}
                      dispatch={dispatch}
                    />
                  ))}
                  {board.todos.length <= 4 && (
                    <li
                      data-item="todo"
                      className="h-[39vh]"
                      onDrop={(e) => onDrop(e, board, null, dispatch)}
                      onDragOver={onDragOver}
                    />
                  )}
                </ul>
              </div>
            </li>
          ))}
          <li>
            <button
              className="border border-[#9333EA] rounded p-4 w-64"
              onClick={() => addBoard(dispatch)}
            >
              Add board
            </button>
          </li>
        </>
      </ul>
    </div>
  );
}

export default BoardComponent;
