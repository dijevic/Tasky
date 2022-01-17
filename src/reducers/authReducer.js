import { types } from "../types/types";

const initialState = {
    user: false

}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                user: action.payload
            }
        case types.authLogout:
            return initialState


        default:
            return state
    }
}