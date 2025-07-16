import { modalMode } from "../../models/modalMode.model";
import { ACTION_BUTTONS, MODAL_MODES } from "../../constants/appConstants";

export interface ModalState {
  isModalOpen: boolean;
  modalTitle: string;
  modalPlaceholder: string;
  modalMode: modalMode;
  buttonText: typeof ACTION_BUTTONS.ADD | typeof ACTION_BUTTONS.EDIT;
}

export const initialStateModal: ModalState = {
  isModalOpen: false,
  modalTitle: "",
  modalPlaceholder: "",
  modalMode: MODAL_MODES.DEFAULT,
  buttonText: ACTION_BUTTONS.ADD,
};
