import { types } from "../types/types";

const initialState = {
    categories: [],
    activeCategory: false,

}

export const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.CategoryCreateCategory:
            return {
                ...state,
                categories: [action.payload, ...state.categories]
            }
        case types.CategoryGetCategories:
            return {
                ...state,
                categories: [...action.payload]
            }
        case types.CategorySetActive:
            return {
                ...state,
                activeCategory: action.payload
            }




        default:
            return state
    }
}