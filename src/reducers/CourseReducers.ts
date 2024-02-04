import { CourseContent, CoursePlan } from "../models/CourseOptions/CourseData";
import { CourseOptions } from "../models/CourseOptions/CourseOptions";

export interface courseReducerProps {
    coursePlan: string;
    courseOptions: CourseOptions | null;
    courseContent: Record<string, CourseContent> | null;
    detailedCoursePlan: CoursePlan[];
    isCourseError: boolean;
    isCourseLoading: boolean;
}

export enum CourseActionTypes {
    GenerateCoursePlan = "GenerateCoursePlan",
    UpdateCoursePlan = "UpdateCoursePlan",
    UpdateCourseContent = "UpdateCourseContent",
    CoursePlanNotFound = "CoursePlanNotFound",
    CourseContentNotUpdated = "CourseContentNotUpdated"
}

export interface CourseAction {
    data: string;
    detailedPlan: CoursePlan[];
    content: Record<string, CourseContent> | null;
    options: CourseOptions | null;
    type: CourseActionTypes;
}

const initState: courseReducerProps = {
    coursePlan: '',
    detailedCoursePlan: [],
    courseOptions: null,
    courseContent: null,
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
        case CourseActionTypes.UpdateCourseContent:
            return {
                ...state,
                courseContent: {
                    ...state.courseContent,
                    ...action.content
                },
                detailedCoursePlan: action.detailedPlan,
                isCourseLoading: false,
                isCourseError: true,
            }
        case CourseActionTypes.CourseContentNotUpdated:
            return {
                ...state,
                isCourseLoading: false,
                isCourseError: true,
            }
        default:
            return state
    }
}

export default courseReducer;