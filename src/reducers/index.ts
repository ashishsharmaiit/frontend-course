import { combineReducers } from "redux";
import courseReducer from "./CourseReducers";
import { authReducer } from "./LoginReducers"; // Import your authReducer

const appReducer = combineReducers({
    course: courseReducer, // It's common to name the state slice according to what it represents
    auth: authReducer, // Adding authReducer to the combined reducers
});

const rootReducer = (state: any, action: any) => {  
    if (action.type === "LOGOUT") {
        state = undefined; // Resetting the state on logout
    }
    return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof appReducer>;



