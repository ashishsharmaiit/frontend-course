import { CourseContent, CoursePlan, Progress } from "../models/CourseOptions/CourseData";
import { CourseOptions } from "../models/CourseOptions/CourseOptions";

export interface courseReducerProps {
    courseOptions: CourseOptions | null;
    courseContent: Record<string, CourseContent> | null;
    detailedCoursePlan: CoursePlan[];
    courseId: string | null, 
    progressStatus: Progress[] | null,
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
    UpdateOnlyCoursePlan = "UpdateOnlyCoursePlan",
}

export interface CourseAction {
    data: CoursePlan[];
    content: CourseContent | null;
    options: CourseOptions | null;
    type: CourseActionTypes;
    payload?: Progress[] | null; // Add this line, assuming payload is a number
    id: string | null;
}


const initState: courseReducerProps = {
    detailedCoursePlan: [],
    courseOptions: null,
    courseContent: null,
    courseId: null,
    progressStatus: null,
    isCourseError: false,
    isCourseLoading: false
}

const courseReducer = (state = initState, action: CourseAction) => {
    switch (action.type) {
        case CourseActionTypes.GenerateCoursePlan:
            console.log('Setting isCourseLoading to true');
            return {
                ...state,
                isCourseLoading: true,
                isCourseError: false,
            };
        

        case CourseActionTypes.UpdateCoursePlan:
            console.log('Before update course plan is:', state.detailedCoursePlan, "actions.data", action.data);
            console.log('Before update course options is:', state.courseOptions, "actions.options", action.options);
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
            console.log('After update: course plan is', updatedState.detailedCoursePlan);
            console.log('After update: course options is', updatedState.courseOptions);
            return updatedState;

        case CourseActionTypes.UpdateOnlyCoursePlan:
            console.log('Before update course plan is:', state.detailedCoursePlan, "actions.data", action.data);
            const updatedState5 = {
                ...state,
                detailedCoursePlan: action.data,
                isCourseLoading: false,
                isCourseError: false,
            };
            console.log('After update: course plan is', updatedState5.detailedCoursePlan);
            return updatedState5;
            
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
            const updatedCourseId = action.id !== undefined ? action.id : state.courseId;

            // Log the values that will be used to update the state
            console.log('Updated courseContent:', updatedCourseContent);
            console.log('Updated detailedCoursePlan:', updatedDetailedCoursePlan);
        
            // Now return the updated state
            const newState = {
                ...state,
                courseContent: updatedCourseContent,
                detailedCoursePlan: updatedDetailedCoursePlan,
                courseId: updatedCourseId,
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
            case CourseActionTypes.UpdateProgressStatus:
                // Log the current state and the incoming payload before the update
                console.log('Current progressStatus:', state.progressStatus);
                console.log('Updating progressStatus with payload:', action.payload);
            
                const updatedState4 = {
                    ...state,
                    progressStatus: action.payload,
                };
            
                // Log the updated state
                console.log('Updated progressStatus:', updatedState4.progressStatus);
            
                return updatedState4;
            
              
        default:
            return state
    }
}

export default courseReducer;