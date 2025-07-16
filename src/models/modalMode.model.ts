import { MODAL_MODES } from "../constants/appConstants";

export type modalMode = typeof MODAL_MODES[keyof typeof MODAL_MODES];
