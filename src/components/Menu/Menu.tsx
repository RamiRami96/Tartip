import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { closeMenu } from "../../state/slices/menuSlice";

type Props = {
  onEdit: <T>(item: T) => void;
  onDelete: () => void;
};

function Menu({ onEdit, onDelete }: Props) {
  const dispatch = useDispatch();
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
  return (
    <div
      ref={menuRef}
      className="absolute mt-2 p-2 bg-[#111827] border rounded shadow"
    >
      <button
        className="cursor-pointer text-color hover:bg-gray-500 hover:text-white p-2 w-full"
        onClick={onEdit}
      >
        Edit item
      </button>
      <button
        className="cursor-pointer text-color hover:bg-gray-500 hover:text-white p-2 w-full"
        onClick={onDelete}
      >
        Delete item
      </button>
    </div>
  );
}

export default Menu;
