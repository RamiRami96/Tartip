import { Dispatch, memo } from "react";

import { openMenu } from "../../state/slices/menuSlice";
import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";
import { MenuIcon } from "../../icons/MenuIcon";

type Props = {
  todo: Todo;
  board: Board;
  onDragStart: () => void;
  onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  dispatch: Dispatch<any>;
};

const TodoComponent = memo(function TodoComponent({
  todo,
  board,
  onDragStart,
  onDrop,
  onDragOver,
  onDragEnd,
  dispatch,
}: Props) {
  const openBoardMenu = (board: Board, todo: Todo) => {
    dispatch(openMenu({ boardId: board.id, todoId: todo.id }));
  };

  return (
    <li
      data-item="todo"
      key={todo.id}
      className="flex p-4 mt-2 bg-[#111827] border border-[#93333EA] text-white cursor-grab rounded"
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragEnd}
    >
      <span className="p-1 w-48 whitespace-break-spaces">{todo.title}</span>
      <button
        className="ml-2 p-1 h-8 w-8 hover:bg-[#9b4ee4] transition-all duration-300 rounded-full"
        onClick={() => openBoardMenu(board, todo)}
      >
        <MenuIcon />
      </button>
    </li>
  );
});

export default TodoComponent;
