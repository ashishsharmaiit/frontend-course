import { CourseData } from "../models/CourseOptions/CourseData";
import { CourseOptions, CourseFirstOptions } from "../models/CourseOptions/CourseOptions";
import { CourseActionTypes } from "../reducers/CourseReducers";
import { toast } from "react-toastify"

const courseGenUrl = 'http://localhost:8081/'
const lessonContentUrl = 'http://localhost:8080/'

export const generateFirstCoursePlan = (
    courseFirstOptions: CourseFirstOptions
): any => {
    return function (dispatch: any) {
        dispatch({ type: CourseActionTypes.UpdateCoursePlan, data: '', options: courseFirstOptions});
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' });
        fetch(courseGenUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"course_options": courseFirstOptions}),
        })
        .then(async (response) => {
            if (response.status !== 204) {
                const jsonResponse = await response.json(); // First, parse the response to JSON.
                if(jsonResponse.error === null) {
                    const detailedResponse = JSON.parse(jsonResponse.response); // Parse the stringified 'response' field to JSON.
                    const { detailedCoursePlan, courseOptions } = detailedResponse; // Destructure the needed properties.
                    console.log ("courseoptions",courseOptions);
                    dispatch({ 
                        type: CourseActionTypes.UpdateCoursePlan, 
                        data: detailedCoursePlan, // Assuming 'data' should be the 'detailedCoursePlan'
                        options: courseOptions // Assuming 'options' should be 'courseOptions'
                    });
                } else {
                    // Handle the case where there is an error in the jsonResponse
                    console.error(jsonResponse.error);
                    toast.error('Error in response');
                    dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
                }
                return;
            }
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        })
        .catch((error) => {
            console.error(error);
            toast.error('Error generating course plan');
            dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
        });
    }
};

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

export const updateCourseContent = (
    courseData: CourseData
): any => {
    return function (dispatch: any) {
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' })
        console.log("sending this course data", courseData)
        fetch(lessonContentUrl, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(courseData), // body data type must match "Content-Type" header
        })
        .then(async (response) => {
            if (response.status !== 204) {
                const data = await response.clone().json();
                console.log("received this response", data)
                dispatch({ type: CourseActionTypes.UpdateCourseContent, content: data.courseContent, data: data.detailedCoursePlan });
                return;
            }
            dispatch({ type: CourseActionTypes.CourseContentNotUpdated });
        })
        .catch((error) => {
            console.log(error);
            toast.error('Error generating course plan');
            dispatch({ type: CourseActionTypes.CourseContentNotUpdated });
        });
    }
}

// If newProgressStatus is expected to be a number
export const updateProgressStatus = (newProgressStatus: number) => ({
    type: 'UpdateProgressStatus',
    payload: newProgressStatus,
});

// If newProgressStatus could be another type, replace `number` with the appropriate type
