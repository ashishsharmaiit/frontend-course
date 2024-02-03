import { CourseOptions } from "../models/CourseOptions/CourseOptions";

export interface courseReducerProps {
    coursePlan: string;
    courseOptions: CourseOptions | null;
    isCourseError: boolean;
    isCourseLoading: boolean;
}

export enum CourseActionTypes {
    GenerateCoursePlan = "GenerateCoursePlan",
    UpdateCoursePlan = "UpdateCoursePlan",
    CoursePlanNotFound = "CoursePlanNotFound"
}

export interface CourseAction {
    data: string;
    options: CourseOptions | null;
    type: CourseActionTypes;
}

const initState: courseReducerProps = {
    coursePlan: '',
    courseOptions: null,
    isCourseError: false,
    isCourseLoading: false
}

const courseReducer = (state = initState, action: CourseAction) => {
    switch (action.type) {
        case CourseActionTypes.GenerateCoursePlan:
            return {
                ...state,
                isCourseLoading: true,
                isCourseError: false,
            }
        case CourseActionTypes.UpdateCoursePlan:
            return {
                ...state,
                coursePlan: action.data,
                courseOptions: action.options,
                isCourseLoading: false,
                isCourseError: false,
            }
        case CourseActionTypes.CoursePlanNotFound:
            return {
                ...state,
                coursePlan: '',
                isCourseLoading: false,
                isCourseError: true,
            }
        default:
            return state
    }
}

export default courseReducer;