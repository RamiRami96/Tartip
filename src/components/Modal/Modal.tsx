import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../hooks/reduxHooks";

import {
  deleteBoard,
  deleteTodo,
  editBoard,
  editTodo,
  setBoard,
  setTodo,
} from "../../state/slices/boardSlice";
import { closeModal } from "../../state/slices/modalSlice";
import { generateUniqueId } from "../../helpers/generateUniqueId";
import { modalMode } from "../../models/modalMode.model";
import { CloseIcon } from "../../icons/CloseIcon";

function Modal() {
  const dispatch = useAppDispatch();
  const { modalPlaceholder, modalTitle, modalMode, buttonText } =
    useTypedSelector((state) => state.modal);
  const { currentBoard, currentTodo } = useTypedSelector(
    (state) => state.boards
  );

  const [value, setValue] = useState(() => {
    switch (modalMode) {
      case "editBoard":
        return currentBoard?.name;
      case "editTodo":
        return currentTodo?.title;
      default:
        return "";
    }
  });
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (mode: modalMode) => {
    if (!value) {
      setError("value required!");
      return;
    }

    switch (mode) {
      case "addBoard":
        const newBoard = {
          id: generateUniqueId(),
          name: value,
          todos: [],
        };

        dispatch(setBoard({ board: newBoard }));
        dispatch(closeModal());
        setError("");

        break;

      case "editBoard":
        dispatch(
          editBoard({
            boardId: currentBoard!.id,
            newBoardName: value,
          })
        );
        dispatch(closeModal());
        setError("");

        break;

      case "addTodo":
        const newTodo = {
          id: Date.now(),
          title: value,
        };

        dispatch(setTodo({ newTodo }));
        dispatch(closeModal());
        setError("");

        break;

      case "editTodo":
        dispatch(
          editTodo({
            boardId: currentBoard!.id,
            todoId: currentTodo!.id,
            title: value,
          })
        );
        dispatch(closeModal());
        setError("");

        break;

      case "default":
        setError("Oops.. something unexpected happened :(");
        break;

      default:
        setError("Oops.. something unexpected happened :(");

        break;
    }
  };

  const handleDelete = (mode: modalMode) => {
    switch (mode) {
      case "editBoard":
        dispatch(
          deleteBoard({
            boardId: currentBoard!.id,
          })
        );
        dispatch(closeModal());
        setError("");

        break;

      case "editTodo":
        dispatch(
          deleteTodo({
            boardId: currentBoard!.id,
            todoId: currentTodo!.id,
          })
        );
        dispatch(closeModal());
        setError("");

        break;

      case "default":
        setError("Oops.. something unexpected happened :(");
        break;

      default:
        setError("Oops.. something unexpected happened :(");

        break;
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative bg-[#1f2937] border border-white p-7 rounded-md w-full sm:w-80 md:w-96"
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 h-8 w-8 hover:bg-[#9b4ee4] transition-all duration-300 rounded-full flex justify-center items-center"
        >
          <CloseIcon />
        </button>
        <h2 className="text-lg font-semibold mb-2">{modalTitle}</h2>
        <div className="mt-4 ">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={modalPlaceholder}
            className="border-2 border-[#374151] p-2 mb-2 w-full rounded  text-white h-16 bg-[#111827]"
          />
          <p className="h-2 text-red-500">{error}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => handleSubmit(modalMode)}
            className="bg-[#9333EA] text-white font-bold py-3 px-4 rounded mr-2"
          >
            {buttonText}
          </button>
          {(modalMode === "editBoard" || modalMode === "editTodo") && (
            <button
              onClick={() => handleDelete(modalMode)}
              className="bg-[#9333EA] text-white font-bold py-3 px-4 rounded mr-2"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
