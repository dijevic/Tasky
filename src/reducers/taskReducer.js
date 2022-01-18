import { types } from "../types/types";

const initialState = {
    tasks: [],
    activeTask: false,

}

export const taskReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.TaskCreateTask:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case types.cleaning:
            return {
                tasks: [],
                activeTask: false,
            }

        case types.TaskGetTasks:

            return {
                ...state,
                tasks: [...action.payload]
            }
        case types.SetActiveTask:
            return {
                ...state,
                activeTask: action.payload
            }
        case types.UnSetActiveTask:
            return {
                ...state,
                activeTask: false
            }
        case types.TasksDeleteTask:
            return {
                ...state,
                tasks: state.tasks.filter(t => t.uuid != action.payload)
            }
        case types.TasksUpdateTask:
            return {
                ...state,
                tasks: state.tasks.map(t => (t.uuid == action.payload.uuid) ? action.payload : t)
                    .sort((a, b) => (a.completed < b.completed) ? -1 : 1)
            }



        default:
            return state
    }
}