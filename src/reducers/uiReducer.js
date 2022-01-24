import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalMode: false

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
        case types.modalModeCategory:
            return {
                ...state,
                modalMode: 'category'
            }
        case types.modalModeClean:
            return {
                ...state,
                modalMode: false
            }


        default:
            return state
    }
}