import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BoardTitle } from "./BoardTitle";
import TodoComponent from "../Todo";
import ModalComponent from "../Modal";

import {
  deleteBoard,
  deleteTodo,
  moveTodo,
  setCurrentBoard,
  setCurrentTodo,
} from "../../state/slices/boardSlice";
import { openModal } from "../../state/slices/modalSlice";
import { RootState } from "../../state/store";

import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";
import { closeMenu } from "../../state/slices/menuSlice";

function BoardComponent() {
  const dispatch = useDispatch();
  const { boards, currentBoard, currentTodo } = useSelector(
    (state: RootState) => state.boards
  );
  const { isModalOpen } = useSelector((state: RootState) => state.modal);

  const onDragStart = useCallback(
    (board: Board, todo: Todo) => {
      dispatch(setCurrentBoard({ currentBoard: board }));
      dispatch(setCurrentTodo({ currentTodo: todo }));
    },
    [dispatch]
  );

  const onDrop = useCallback(
    (
      e: React.DragEvent<HTMLLIElement>,
      targetBoard: Board,
      targetTodo: Todo | null
    ) => {
      e.preventDefault();

      const targetElement = e.target as HTMLLIElement;
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
    },
    [currentBoard, currentTodo, dispatch]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    const isTodoItem = e.currentTarget.dataset.item === "todo";

    if (isTodoItem) {
      const targetElement = e.target as HTMLLIElement;
      targetElement.style.borderColor = "#9999EA";
    }
  }, []);

  const onDragEnd = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    const targetElement = e.target as HTMLLIElement;
    targetElement.style.borderColor = "#fff";
  }, []);

  const addBoard = () => {
    dispatch(
      openModal({
        modalTitle: "Add new board",
        modalPlaceholder: "Enter title of board",
        modalMode: "addBoard",
      })
    );
  };

  const onEditBoard = (board: Board) => {
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

  const onDeleteBoard = (boardId: number) => {
    dispatch(deleteBoard({ boardId }));
    dispatch(closeMenu());
  };

  const addTodo = (currentBoard: Board) => {
    dispatch(setCurrentBoard({ currentBoard }));

    dispatch(
      openModal({
        modalTitle: "Add new todo",
        modalPlaceholder: "Enter title of todo",
        modalMode: "addTodo",
      })
    );
  };

  const onEditTodo = (board: Board, todo: Todo) => {
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

  const onDeleteTodo = (boardId: number, todoId: number) => {
    dispatch(deleteTodo({ boardId, todoId }));
  };

  return (
    <>
      <div className="mt-20 h-[85vh]">
        <ul className="flex overflow-x-auto pb-3 ">
          {boards.map((board) => (
            <li
              key={board.id}
              className="border border-[#9333EA] flex flex-col justify-between rounded p-3 mr-4 min-w-60 max-w-60"
            >
              <BoardTitle
                id={board.id}
                title={board.name}
                onEdit={() => onEditBoard(board)}
                onDelete={() => onDeleteBoard(board.id)}
              />
              <div className="overflow-y-auto px-2 h-[50vh]">
                <ul>
                  {board.todos.length >= 5 ? (
                    <>
                      {board.todos.map((todo) => (
                        <TodoComponent
                          key={todo.id}
                          todo={todo}
                          board={board}
                          onDragStart={() => onDragStart(board, todo)}
                          onDrop={(e) => onDrop(e, board, todo)}
                          onDragOver={onDragOver}
                          onDragEnd={onDragEnd}
                          onEdit={onEditTodo}
                          onDelete={onDeleteTodo}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {board.todos.map((todo) => (
                        <TodoComponent
                          key={todo.id}
                          todo={todo}
                          board={board}
                          onDragStart={() => onDragStart(board, todo)}
                          onDrop={(e) => onDrop(e, board, todo)}
                          onDragOver={onDragOver}
                          onDragEnd={onDragEnd}
                          onEdit={onEditTodo}
                          onDelete={onDeleteTodo}
                        />
                      ))}
                      <li
                        data-item="todo"
                        className="h-[39vh]"
                        onDrop={(e) => onDrop(e, board, null)}
                        onDragOver={onDragOver}
                      />
                    </>
                  )}
                </ul>
              </div>
              <button
                className="bg-[#9333EA] text-white font-bold rounded p-4 mt-2 ml-2 mr-2"
                onClick={() => addTodo(board)}
              >
                Add todo
              </button>
            </li>
          ))}
          <li>
            <button
              className="border border-[#9333EA] rounded p-4 w-64"
              onClick={addBoard}
            >
              Add board
            </button>
          </li>
        </ul>
      </div>
      {isModalOpen && <ModalComponent />}
    </>
  );
}

export default BoardComponent;
