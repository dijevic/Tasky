import { types } from "../types/types";

export const openModal = () => ({
    type: types.modalOpen
})
export const closeModal = () => ({
    type: types.modalClose
})
export const setTaskMode = () => ({
    type: types.modalModeTask
})
export const setCategoryMode = () => ({
    type: types.modalModeCategory
})
export const setNewTaskMode = () => ({
    type: types.modalModeNewTask
})
export const cleanMode = () => ({
    type: types.modalModeClean
})