import { useSelector, useDispatch } from "react-redux";

import MenuComponent from "../Menu";
import { RootState } from "../../state/store";
import { openMenu } from "../../state/slices/menuSlice";

type Props = {
  id: number;
  title: string;
  onEdit: <T>(item: T) => void;
  onDelete: () => void;
};

export function BoardTitle({ id, title, onEdit, onDelete }: Props) {
  const dispatch = useDispatch();

  const { isMenuOpen, boardId, todoId } = useSelector(
    (state: RootState) => state.menu
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
}
