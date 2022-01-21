import Swal from 'sweetalert2'
import { fetchWithToken } from "../services/fetchData";
import { types } from "../types/types";


const newCategory = (category) => ({
    type: types.CategoryCreateCategory,
    payload: category
})


export const startAddNewCategory = (category) => {

    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(category, 'POST', 'v1/category/')
            const data = await resp.json()
            if (data.ok) {
                category.uuid = data.category.uuid;
                dispatch(newCategory(category))

            } else {
                Swal.fire('error', `something went wrong creating the category`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}


const getcategorysByUser = (categories) => ({
    type: types.CategoryGetCategories,
    payload: categories
})



export const startGetcategorysByUser = () => {

    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(false, 'GET', 'v1/category/user')

            const data = await resp.json()

            if (data.ok) {
                dispatch(getcategorysByUser(data.categories))
                dispatch(setCategoryActive(data.categories[0]))

            } else {
                Swal.fire('error', `something went wrong creting the category`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}

export const setCategoryActive = (category) => ({

    type: types.CategorySetActive,
    payload: category
})




