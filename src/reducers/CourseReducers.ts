import { CourseContent, CoursePlan } from "../models/CourseOptions/CourseData";
import { CourseOptions } from "../models/CourseOptions/CourseOptions";

export interface courseReducerProps {
    courseOptions: CourseOptions | null;
    courseContent: Record<string, CourseContent> | null;
    detailedCoursePlan: CoursePlan[];
    courseId: string | null, 
    progressStatus: number | 0,
    isCourseError: boolean;
    isCourseLoading: boolean;
}

export enum CourseActionTypes {
    GenerateCoursePlan = "GenerateCoursePlan",
    UpdateCoursePlan = "UpdateCoursePlan",
    UpdateCourseContent = "UpdateCourseContent",
    CoursePlanNotFound = "CoursePlanNotFound",
    CourseContentNotUpdated = "CourseContentNotUpdated",
    UpdateProgressStatus = "UpdateProgressStatus", // Add this line
}

export interface CourseAction {
    data: CoursePlan[];
    content: CourseContent | null;
    options: CourseOptions | null;
    type: CourseActionTypes;
    payload?: number; // Add this line, assuming payload is a number
}

const initState: courseReducerProps = {
    detailedCoursePlan: [],
    courseOptions: null,
    courseContent: null,
    courseId: null, 
    progressStatus: 0,
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
            console.log('Before update:', state.courseOptions, "actions.options", action.options);
            const updatedState = {
                ...state,
                detailedCoursePlan: action.data,
                courseOptions: {
                    ...state.courseOptions,
                    ...action.options,
                },
                isCourseLoading: false,
                isCourseError: false,
            };
            console.log('After update:', updatedState.courseOptions);
            return updatedState;
            
        case CourseActionTypes.CoursePlanNotFound:
            return {
                ...state,
                detailedCoursePlan: [],
                isCourseLoading: false,
                isCourseError: true,
            }
        case CourseActionTypes.UpdateCourseContent:
            // Log the current state and action content before the update
            console.log('Current state before UpdateCourseContent:', state);
            console.log('Action received in UpdateCourseContent:', action);
        
            // Prepare the updated values but do not update the state yet
            const updatedCourseContent = {
                ...state.courseContent,
                ...action.content,
            };
            const updatedDetailedCoursePlan = action.data !== undefined ? action.data : state.detailedCoursePlan;
        
            // Log the values that will be used to update the state
            console.log('Updated courseContent:', updatedCourseContent);
            console.log('Updated detailedCoursePlan:', updatedDetailedCoursePlan);
        
            // Now return the updated state
            const newState = {
                ...state,
                courseContent: updatedCourseContent,
                detailedCoursePlan: updatedDetailedCoursePlan,
                isCourseLoading: false,
                isCourseError: false, // Assuming you want to mark it as false if this action is successfully processed
            };
        
            // Log the new state before actually returning it
            console.log('New state after UpdateCourseContent:', newState);
        
            return newState;
        
        case CourseActionTypes.CourseContentNotUpdated:
            return {
                ...state,
                isCourseLoading: false,
                isCourseError: true,
            }
        case 'UpdateProgressStatus':
            return {
                ...state,
                progressStatus: action.payload,
            };
              
        default:
            return state
    }
}

export default courseReducer;