import { CourseOptions, CourseFirstOptions } from "../models/CourseOptions/CourseOptions";
import { CourseActionTypes } from "../reducers/CourseReducers";
import { toast } from "react-toastify"

const courseGenUrl = 'https://us-central1-socratiq.cloudfunctions.net/course_plan_generator'

export const generateFirstCoursePlan = (
    courseFirstOptions: CourseFirstOptions
): any => {
    return function (dispatch: any) {
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' })

        fetch(courseGenUrl, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"course_options": courseFirstOptions}), // body data type must match "Content-Type" header
        })
        .then(async (response) => {
            if (response.status !== 204) {
                const data = await response.clone().json();
                dispatch({ type: CourseActionTypes.UpdateCoursePlan, data: data.plan, options: data.options });
                return;
            }
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error generating course plan');
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        });
    }
}

export const generateCoursePlan = (
    courseOptions: CourseOptions
): any => {
    return function (dispatch: any) {
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' })

        fetch(courseGenUrl, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"course_options": courseOptions}), // body data type must match "Content-Type" header
        })
        .then(async (response) => {
            if (response.status !== 204) {
                const data = await response.clone().json();
                dispatch({ type: CourseActionTypes.UpdateCoursePlan, data: data.plan, options: data.options });
                return;
            }
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error generating course plan');
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        });
    }
}