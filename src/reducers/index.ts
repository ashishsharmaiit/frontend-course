import { combineReducers } from "redux"
import courseReducer from "./CourseReducers";

const appReducer = combineReducers({
    courseReducer
})

const rootReducer = (state: any, action: any) => {  
    if (action.type === "LOGOUT") {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer

export type RootState = ReturnType<typeof appReducer>



