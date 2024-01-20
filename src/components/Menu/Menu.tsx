import { memo, useEffect, useRef } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { closeMenu } from "../../state/slices/menuSlice";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const Menu = memo(function Menu({ onEdit, onDelete }: Props) {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch(closeMenu());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = () => {
    onEdit();
    dispatch(closeMenu());
  };

  const handleDelete = () => {
    onDelete();
    dispatch(closeMenu());
  };

  return (
    <div
      ref={menuRef}
      className="absolute mt-2 p-2 bg-[#111827] border rounded shadow"
    >
      <button
        className="cursor-pointer text-color hover:bg-gray-500 hover:text-white p-2 w-full"
        onClick={handleEdit}
      >
        Edit item
      </button>
      <button
        className="cursor-pointer text-color hover:bg-gray-500 hover:text-white p-2 w-full"
        onClick={handleDelete}
      >
        Delete item
      </button>
    </div>
  );
});

export default Menu;
