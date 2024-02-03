import axios from 'axios';
import { CourseOptions } from "../models/CourseOptions/CourseOptions";
import { CourseActionTypes } from "../reducers/CourseReducers";
import { toast } from "react-toastify"

export const generateCoursePlan = (
    courseOptions: CourseOptions
): any => {
    return function (dispatch: any) {
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' })

        axios({
            method: 'post',
            url: 'http://localhost:8080/generate_course_plan',
            data: courseOptions
        })
        .then((response) => {
            if (response.data && response.data.plan) {
                dispatch({ type: CourseActionTypes.UpdateCoursePlan, data: response.data.plan });
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