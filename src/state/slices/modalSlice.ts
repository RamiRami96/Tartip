import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isModalOpen: boolean;
  modalTitle: string;
  modalPlaceholder: string;
  modalMode: "addBoard" | "editBoard" | "addTodo" | "editTodo" | "default";
  buttonText: "Add" | "Edit";
}

const initialState: ModalState = {
  isModalOpen: false,
  modalTitle: "",
  modalPlaceholder: "",
  modalMode: "default",
  buttonText: "Add",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalTitle: string;
        modalPlaceholder: string;
        modalMode:
          | "addBoard"
          | "editBoard"
          | "addTodo"
          | "editTodo"
          | "default";
        buttonText?: "Add" | "Edit";
      }>
    ) => {
      const {
        modalTitle,
        modalPlaceholder,
        modalMode,
        buttonText = "Add",
      } = action.payload;
      state.modalTitle = modalTitle;
      state.modalPlaceholder = modalPlaceholder;
      state.modalMode = modalMode;
      state.isModalOpen = true;
      state.buttonText = buttonText;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalTitle = "";
      state.modalPlaceholder = "";
      state.modalMode = "default";
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload;
    },
    setModalPlaceholder: (state, action) => {
      state.modalPlaceholder = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalTitle, setModalPlaceholder } =
  modalSlice.actions;

export default modalSlice.reducer;
