import { memo } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/reduxHooks";

import MenuComponent from "../Menu";
import { openMenu } from "../../state/slices/menuSlice";

type Props = {
  id: number;
  title: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const BoardTitle = memo(function BoardTitle({
  id,
  title,
  onEdit,
  onDelete,
}: Props) {
  const dispatch = useAppDispatch();

  const { isMenuOpen, boardId, todoId } = useTypedSelector(
    (state) => state.menu
  );

  const openBoardMenu = () => {
    dispatch(openMenu({ boardId: id, todoId: null }));
  };

  return (
    <button className="relative" onClick={openBoardMenu}>
      <h2 className="text-left pl-2 mb-4 overflow-hidden">{title}</h2>
      {isMenuOpen && boardId === id && !todoId && (
        <MenuComponent onEdit={onEdit} onDelete={onDelete} />
      )}
    </button>
  );
});
