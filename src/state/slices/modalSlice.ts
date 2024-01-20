import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { modalMode } from "../../models/modalMode.model";
import { initialStateModal } from "../initialStates/modalState";

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialStateModal,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalTitle: string;
        modalPlaceholder: string;
        modalMode: modalMode;
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
