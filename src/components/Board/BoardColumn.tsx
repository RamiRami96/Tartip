import { Dispatch, memo } from "react";

import { BoardTitle } from "./BoardTitle";
import TodoComponent from "../Todo";
import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";

type Props = {
  boards: Board[];
  addBoard: (dispatch: Dispatch<any>) => void;
  onEditBoard: (board: Board, dispatch: Dispatch<any>) => void;
  onDeleteBoard: (boardId: number, dispatch: Dispatch<any>) => void;
  addTodo: (currentBoard: Board, dispatch: Dispatch<any>) => void;
  onEditTodo: (board: Board, todo: Todo, dispatch: Dispatch<any>) => void;
  onDeleteTodo: (
    boardId: number,
    todoId: number,
    dispatch: Dispatch<any>
  ) => void;
  onDragStart: (board: Board, todo: Todo, dispatch: Dispatch<any>) => void;
  onDrop: (
    e: React.DragEvent<HTMLLIElement>,
    targetBoard: Board,
    targetTodo: Todo | null,
    dispatch: Dispatch<any>
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  dispatch: Dispatch<any>;
};

export const BoardColumn = memo(function BoardColumn({
  boards,
  addBoard,
  onEditBoard,
  onDeleteBoard,
  addTodo,
  onEditTodo,
  onDeleteTodo,
  onDragStart,
  onDrop,
  onDragOver,
  onDragEnd,
  dispatch,
}: Props) {
  return (
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
          <div className="overflow-y-auto px-2 h-[55vh]">
            <button
              className="bg-[#9333EA] height-[65.6px] text-white font-bold rounded p-4 mb-2 w-full"
              onClick={() => addTodo(board, dispatch)}
            >
              Add todo
            </button>
            <ul>
              {board.todos.length >= 4 ? (
                <>
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
                </>
              ) : (
                <>
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
                  <li
                    data-item="todo"
                    className="h-[39vh]"
                    onDrop={(e) => onDrop(e, board, null, dispatch)}
                    onDragOver={onDragOver}
                  />
                </>
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
  );
});
