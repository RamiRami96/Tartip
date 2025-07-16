import { useCallback } from "react";
import { useAppDispatch, useTypedSelector } from "../../helpers/typedRedux";

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
import { MODAL_TITLES, MODAL_PLACEHOLDERS, UI_BUTTONS, ACTION_BUTTONS, MODAL_MODES } from "../../constants/appConstants";

function BoardComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const { boards, currentBoard, currentTodo } = useTypedSelector(
    (state) => state.boards
  );

  const onDragStart = useCallback(
    (board: Board, todo: Todo): void => {
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
    ): void => {
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

  const onDragOver = useCallback((e: React.DragEvent<HTMLLIElement>): void => {
    e.preventDefault();

    const isTodoItem = e.currentTarget.dataset.item === "todo";

    if (isTodoItem) {
      const targetElement = e.currentTarget as HTMLLIElement;
      targetElement.style.borderColor = "#9999EA";
    }
  }, []);

  const onDragEnd = useCallback((e: React.DragEvent<HTMLLIElement>): void => {
    const targetElement = e.currentTarget as HTMLLIElement;
    targetElement.style.borderColor = "#fff";
  }, []);

  const addBoard = (): void => {
    dispatch(
      openModal({
        modalTitle: MODAL_TITLES.ADD_NEW_BOARD,
        modalPlaceholder: MODAL_PLACEHOLDERS.ENTER_BOARD_TITLE,
        modalMode: MODAL_MODES.ADD_BOARD,
      })
    );
  };

  const editBoard = useCallback((currentBoard: Board): void => {
    dispatch(setCurrentBoard({ currentBoard }));

    dispatch(
      openModal({
        modalTitle: MODAL_TITLES.EDIT_DELETE_BOARD,
        modalPlaceholder: MODAL_PLACEHOLDERS.ENTER_BOARD_TITLE,
        modalMode: MODAL_MODES.EDIT_BOARD,
        buttonText: ACTION_BUTTONS.EDIT,
      })
    );
  }, [dispatch]);

  const addTodo = (currentBoard: Board): void => {
    dispatch(setCurrentBoard({ currentBoard }));

    dispatch(
      openModal({
        modalTitle: MODAL_TITLES.ADD_NEW_TODO,
        modalPlaceholder: MODAL_PLACEHOLDERS.ENTER_TODO_TITLE,
        modalMode: MODAL_MODES.ADD_TODO,
      })
    );
  };

  const onEditTodo = useCallback((currentBoard: Board, currentTodo: Todo): void => {
    dispatch(setCurrentBoard({ currentBoard }));
    dispatch(setCurrentTodo({ currentTodo }));

    dispatch(
      openModal({
        modalTitle: MODAL_TITLES.EDIT_DELETE_TODO,
        modalPlaceholder: MODAL_PLACEHOLDERS.ENTER_TODO_TITLE,
        modalMode: MODAL_MODES.EDIT_TODO,
        buttonText: ACTION_BUTTONS.EDIT,
      })
    );
  }, [dispatch]);

  return (
    <main className="mt-16">
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
                  {UI_BUTTONS.ADD_TODO}
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
              {UI_BUTTONS.ADD_BOARD}
            </button>
          </li>
        </>
      </ul>
    </main>
  );
}

export default BoardComponent;
