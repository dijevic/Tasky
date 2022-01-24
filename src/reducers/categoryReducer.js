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
                categories: [...state.categories, action.payload]
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
        case types.CategoryUpdateCategory:
            return {
                ...state,
                categories: state.categories.map(c => (c.value == action.payload.value) ? action.payload : c)
            }
        case types.CategoryDeleteCategory:
            return {
                ...state,
                categories: state.categories.filter(c => c.value != action.payload)
            }




        default:
            return state
    }
}