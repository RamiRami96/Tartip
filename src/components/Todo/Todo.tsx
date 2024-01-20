import { Dispatch, memo } from "react";
import { useTypedSelector } from "../../hooks/reduxHooks";

import MenuComponent from "../Menu";
import { openMenu } from "../../state/slices/menuSlice";
import { Board } from "../../models/board.model";
import { Todo } from "../../models/todo.model";
import { MenuIcon } from "../../icons/MenuIcon";

type Props = {
  todo: Todo;
  board: Board;
  onDragStart: (board: Board, todo: Todo) => void;
  onDrop: (
    e: React.DragEvent<HTMLLIElement>,
    targetBoard: Board,
    targetTodo: Todo
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  onEdit: (board: Board, todo: Todo, dispatch: Dispatch<any>) => void;
  onDelete: (boardId: number, todoId: number, dispatch: Dispatch<any>) => void;
  dispatch: Dispatch<any>;
};

const TodoComponent = memo(function TodoComponent({
  todo,
  board,
  onDragStart,
  onDrop,
  onDragOver,
  onDragEnd,
  onEdit,
  onDelete,
  dispatch,
}: Props) {
  const { isMenuOpen, boardId, todoId } = useTypedSelector(
    (state) => state.menu
  );

  const openBoardMenu = (boardId: number, todoId: number) => {
    dispatch(openMenu({ boardId, todoId }));
  };

  const onEditHandle = (board: Board, todo: Todo) => {
    onEdit(board, todo, dispatch);
  };

  const onDeleteHandle = (boardId: number, todoId: number) => {
    onDelete(boardId, todoId, dispatch);
  };

  return (
    <li
      data-item="todo"
      key={todo.id}
      className="flex p-4 mt-2 bg-[#111827] border border-[#93333EA] text-white cursor-grab rounded"
      draggable
      onDragStart={() => onDragStart(board, todo)}
      onDrop={(e) => onDrop(e, board, todo)}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragLeave={onDragEnd}
    >
      <span className="p-1 w-48 whitespace-break-spaces">{todo.title}</span>

      {isMenuOpen && boardId === board.id && todoId === todo.id && (
        <MenuComponent
          onEdit={() => onEditHandle(board, todo)}
          onDelete={() => onDeleteHandle(board.id, todo.id)}
        />
      )}

      <button
        className="ml-2 p-1 h-8 w-8 hover:bg-[#9b4ee4] transition-all duration-300 rounded-full"
        onClick={() => openBoardMenu(board.id, todo.id)}
      >
        <MenuIcon />
      </button>
    </li>
  );
});

export default TodoComponent;
