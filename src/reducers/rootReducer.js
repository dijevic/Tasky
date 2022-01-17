import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { taskReducer } from "./taskReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    task: taskReducer

})