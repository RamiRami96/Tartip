import { useCallback } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/reduxHooks";

import { BoardTitle } from "./BoardTitle";
import TodoComponent from "../Todo";

import {
  moveTodo,
  setCurrentBoard,
  setCurrentTodo,
} from "../../state/slices/boardSlice";
import { openModal } from "../../state/slices/modalSlice";
import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";

function BoardComponent() {
  const dispatch = useAppDispatch();

  const { boards, currentBoard, currentTodo } = useTypedSelector(
    (state) => state.boards
  );

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
    },
    [dispatch, currentBoard, currentTodo]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();

    const isTodoItem = e.currentTarget.dataset.item === "todo";

    if (isTodoItem) {
      const targetElement = e.currentTarget as HTMLLIElement;
      targetElement.style.borderColor = "#9999EA";
    }
  }, []);

  const onDragEnd = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    const targetElement = e.currentTarget as HTMLLIElement;
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

  const editBoard = useCallback((currentBoard: Board) => {
    dispatch(setCurrentBoard({ currentBoard }));

    dispatch(
      openModal({
        modalTitle: "Edit/Delete Board",
        modalPlaceholder: "Enter title of board",
        modalMode: "editBoard",
        buttonText: "Edit",
      })
    );
  }, []);

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

  const onEditTodo = useCallback((currentBoard: Board, currentTodo: Todo) => {
    dispatch(setCurrentBoard({ currentBoard }));
    dispatch(setCurrentTodo({ currentTodo }));

    dispatch(
      openModal({
        modalTitle: "Edit/Delete todo",
        modalPlaceholder: "Enter title of todo",
        modalMode: "editTodo",
        buttonText: "Edit",
      })
    );
  }, []);

  return (
    <div className="mt-16">
      <ul className="flex overflow-x-auto pb-3 ">
        <>
          {boards.map((board) => (
            <li
              key={board.id}
              className="border border-[#9333EA] flex flex-col justify-between rounded p-3 mr-4 min-w-72 max-w-72"
            >
              <BoardTitle board={board} onEdit={editBoard} />
              <div className="overflow-y-auto p-2 px-2 h-[55vh]">
                <button
                  className="bg-[#9333EA] height-[65.6px] text-white font-bold rounded p-4 mb-2 w-full"
                  onClick={() => addTodo(board)}
                >
                  Add todo
                </button>
                <ul>
                  {board.todos.map((todo) => (
                    <TodoComponent
                      key={todo.id}
                      todo={todo}
                      board={board}
                      onDragStart={onDragStart}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragEnd={onDragEnd}
                      onEdit={onEditTodo}
                    />
                  ))}
                  {board.todos.length <= 4 && (
                    <li
                      data-item="todo"
                      className="h-[34vh]"
                      onDrop={(e: React.DragEvent<HTMLLIElement>) =>
                        onDrop(e, board, null)
                      }
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
              onClick={addBoard}
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
