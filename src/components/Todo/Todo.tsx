import { memo } from "react";
import { ModalIcon } from "../../icons/ModalIcon";

import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";

type Props = {
  todo: Todo;
  board: Board;
  onDragStart: (board: Board, todo: Todo) => void;
  onDrop: (
    e: React.DragEvent<HTMLLIElement>,
    targetBoard: Board,
    targetTodo: Todo | null
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  onEdit: (board: Board, todo: Todo) => void;
};

const TodoComponent = memo(function TodoComponent({
  todo,
  board,
  onDragStart,
  onDrop,
  onDragOver,
  onDragEnd,
  onEdit,
}: Props) {
  return (
    <li
      data-item="todo"
      className="flex p-4 mt-2 bg-[#111827] border border-[#9333EA] text-white cursor-grab rounded"
      draggable
      onDragStart={() => onDragStart(board, todo)}
      onDrop={(e) => onDrop(e, board, todo)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragEnd}
    >
      <span className="p-1 w-48 whitespace-break-spaces">{todo.title}</span>
      <button
        className="ml-2 p-1 h-8 w-8 hover:bg-[#9b4ee4] transition-all duration-300 rounded-full"
        onClick={() => onEdit(board, todo)}
      >
        <ModalIcon />
      </button>
    </li>
  );
});

export default TodoComponent;
