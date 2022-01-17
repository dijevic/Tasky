import { types } from "../types/types";

export const openModal = () => ({
    type: types.modalOpen
})
export const closeModal = () => ({
    type: types.modalClose
})