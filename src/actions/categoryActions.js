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
                const categoryFixed = { value: data.category.uuid, label: category.name }
                dispatch(newCategory(categoryFixed))
                Swal.fire('Great', `category created !`, 'success')


            } else {
                Swal.fire('error', `something went wrong :(`, 'error')
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

                const mappedCategories = data.categories.map(category => {
                    return { value: category.uuid, label: category.name }
                })
                dispatch(getcategorysByUser(mappedCategories))


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


const updateCategory = (category) => ({

    type: types.CategoryUpdateCategory,
    payload: category
})

export const startUpdateCategory = (uuid, name) => {

    return async (dispatch) => {

        try {
            const resp = await fetchWithToken({ name }, 'PUT', `v1/category/${uuid}`,)
            const data = await resp.json()
            if (data.ok) {
                const categoryFixed = { value: data.category.uuid, label: data.category.name }
                dispatch(updateCategory(categoryFixed))
                Swal.fire('great', `category updated`, 'success')

            } else {
                Swal.fire('error', `${data.msg}`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}

const deleteCategory = (uuid) => ({

    type: types.CategoryDeleteCategory,
    payload: uuid
})


export const startDeleteCategory = (uuid) => {

    return async (dispatch) => {

        try {
            const resp = await fetchWithToken({}, 'DELETE', `v1/category/${uuid}`,)
            const data = await resp.json()
            if (data.ok) {
                dispatch(deleteCategory(uuid))
                Swal.fire('great', `category Deleted`, 'success')

            } else {
                Swal.fire('error', `${data.msg}`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}




