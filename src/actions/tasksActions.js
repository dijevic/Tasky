import { deleteTasksFetch, fetchWithToken, updateTasksFetch } from "../services/fetchData";
import { types } from "../types/types";

export const newTask = (task) => ({
    type: types.TaskCreateTask,
    payload: task
})


export const startAddNewTask = (task, alert, label) => {



    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(task, 'POST', 'v1/task/')
            const data = await resp.json()
            if (data.ok) {
                task.uuid = data.task.uuid;
                task.creationDate = new Date().getTime();
                task.completed = false
                task.task_category = { uuid: task.task_category, name: label }
                dispatch(newTask(task))
                alert.success('Task created successfully !')



            } else {
                alert.error('something went wrong, try it again')

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

export const startGetTasksByUser = () => {

    return async (dispatch) => {


        try {
            const resp = await fetchWithToken(false, 'GET', 'v1/task/user')
            const data = await resp.json()
            if (data.ok) {
                const dataSorted = data.tasks.sort((a, b) => (a.completed < b.completed) ? -1 : 1)
                dispatch(getTasksByUser(dataSorted))


            } else {
                alert.error('something went wrong :(')
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

export const startDeleteTask = (uuid, alert) => {

    return async (dispatch) => {


        try {

            const resp = await deleteTasksFetch(`v1/task/${uuid}`)

            const data = await resp.json()

            if (data.ok) {
                dispatch(deleteTask(uuid))
                alert.success('The task has been deleted successfully')


            } else {
                alert.error(`something went wrong :(`)
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

export const startUpdateTask = (uuid, fills, alert) => {

    return async (dispatch) => {

        try {
            const resp = await updateTasksFetch(`v1/task/${uuid}`, { ...fills })
            const data = await resp.json()

            if (data.ok) {

                dispatch(updateTask(data.task))
                dispatch(setActiveTask(data.task))


            } else {
                alert.error(`something went wrong :(`)

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
