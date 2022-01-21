import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { CategoryReducer } from "./categoryReducer";
import { taskReducer } from "./taskReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    task: taskReducer,
    category: CategoryReducer

})