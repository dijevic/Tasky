import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalMode: false,
    darkMode: false

}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.modalOpen:
            return {
                ...state,
                modalOpen: true
            }
        case types.modalClose:
            return {
                ...state,
                modalOpen: false
            }
        case types.modalModeTask:
            return {
                ...state,
                modalMode: 'task'
            }
        case types.modalModeNewTask:
            return {
                ...state,
                modalMode: 'new task'
            }
        case types.modalModeCategory:
            return {
                ...state,
                modalMode: 'category'
            }
        case types.modalProfileMode:
            return {
                ...state,
                modalMode: 'profile'
            }
        case types.modalModeClean:
            return initialState



        default:
            return state
    }
}