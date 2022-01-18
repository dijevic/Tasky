import Swal from 'sweetalert2'
import { deleteTasksFetch, fetchWithToken, updateTasksFetch } from "../services/fetchData";
import { types } from "../types/types";


export const newTask = (task) => ({
    type: types.TaskCreateTask,
    payload: task
})


export const startAddNewTask = (task) => {

    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(task, 'POST', 'v1/task/')
            const data = await resp.json()

            if (data.ok) {
                task.uuid = data.task.uuid;
                task.creationDate = new Date().getTime();
                dispatch(newTask(task))

            } else {
                Swal.fire('error', `something went wrong cretinf the task`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}


const getTasksByUser = (tasks) => ({
    type: types.TaskGetTasks,
    payload: tasks
})
// sort((a,b)=> (a.completed > b.completed) ? -1 : 1)

export const startGetTasksByUser = () => {

    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(false, 'GET', 'v1/task/user')
            const data = await resp.json()

            if (data.ok) {
                const dataSorted = data.tasks.sort((a, b) => (a.completed < b.completed) ? -1 : 1)
                dispatch(getTasksByUser(dataSorted))

            } else {
                Swal.fire('error', `something went wrong creting the task`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}



const deleteTask = (uuid) => ({
    type: types.TasksDeleteTask,
    payload: uuid
})

export const startDeleteTask = (uuid) => {

    return async (dispatch) => {


        try {

            const resp = await deleteTasksFetch(`v1/task/${uuid}`)

            const data = await resp.json()



            if (data.ok) {
                dispatch(deleteTask(uuid))
                Swal.fire('Great', 'the task has been deleted successfully', 'success')

            } else {
                Swal.fire('error', `something went wrong :(`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}

const updateTask = (task) => ({
    type: types.TasksUpdateTask,
    payload: task
})

export const startUpdateTask = (uuid, fills) => {

    return async (dispatch) => {

        console.log({ ...fills })
        try {
            const resp = await updateTasksFetch(`v1/task/${uuid}`, { ...fills })
            const data = await resp.json()
            if (data.ok) {

                dispatch(updateTask(data.task))

            } else {
                Swal.fire('error', `something went wrong :(`, 'error')
            }


        } catch (e) {
            console.log(e)
        }

    }
}



export const setActiveTask = (task) => ({
    type: types.SetActiveTask,
    payload: task
})
export const unSetActiveTask = () => ({
    type: types.UnSetActiveTask,
})

export const cleaning = () => ({
    type: types.cleaning
})
