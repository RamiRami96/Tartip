import { modalMode } from "../../models/modalMode.model";

export interface ModalState {
  isModalOpen: boolean;
  modalTitle: string;
  modalPlaceholder: string;
  modalMode: modalMode;
  buttonText: "Add" | "Edit";
}

export const initialStateModal: ModalState = {
  isModalOpen: false,
  modalTitle: "",
  modalPlaceholder: "",
  modalMode: "default",
  buttonText: "Add",
};
