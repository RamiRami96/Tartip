import { memo } from "react";
import { Board } from "../../models/board.model";
import { ModalIcon } from "../../icons/ModalIcon";

type Props = {
  board: Board;
  onEdit: (currentBoard: Board) => void;
};

export const BoardTitle = memo(function BoardTitle({ board, onEdit }: Props): JSX.Element {
  return (
    <div className="flex justify-between px-2">
      <h2 className="text-left  mr-2 mb-4 overflow-hidden">{board.name}</h2>
      <button
        className="ml-2 p-1 h-8 w-8 hover:bg-[#9b4ee4] transition-all duration-300 rounded-full"
        onClick={() => onEdit(board)}
      >
        <ModalIcon />
      </button>
    </div>
  );
});
