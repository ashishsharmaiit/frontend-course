import { CourseData, Progress } from "../models/CourseOptions/CourseData";
import { CourseOptions } from "../models/CourseOptions/CourseOptions";
import { CourseActionTypes } from "../reducers/CourseReducers";
import { toast } from "react-toastify"

const courseGenUrl = 'http://localhost:8081/'
const lessonContentUrl = 'http://localhost:8080/'
const welcomeUrl = 'http://localhost:8082/'

export const generateFirstCoursePlan = (
    courseOptions: CourseOptions
): any => {
    return function (dispatch: any) {
        console.log('Dispatching UpdateCoursePlan with options:', courseOptions);
        dispatch({ type: CourseActionTypes.UpdateCoursePlan, data: '', options: courseOptions});
        
        console.log('Dispatching GenerateCoursePlan');
        dispatch({ type: CourseActionTypes.GenerateCoursePlan, data: '' });
        
        console.log('Sending POST request to welcomeUrl with courseFirstOptions:', courseOptions);
        fetch(welcomeUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"courseOptions": courseOptions}),
        })
        .then(async (response) => {
            console.log('Received response from welcomeUrl:', response);
            if (response.ok) { // Checks if the response status is 2xx
                const jsonResponse = await response.json();
                console.log('Parsed JSON response:', jsonResponse);
                
                // Directly access courseContent without assuming an error field
                if (jsonResponse && jsonResponse.courseContent) {
                    console.log('Received courseContent:', jsonResponse.courseContent);
                    dispatch({ 
                        type: CourseActionTypes.UpdateCourseContent, 
                        content: jsonResponse.courseContent,
                    });
                } else {
                    // Handle the case where courseContent is not as expected
                    console.error('Unexpected JSON structure:', jsonResponse);
                    toast.error('Unexpected response structure');
                    dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
                }
            } else {
                // Handle HTTP errors
                console.error('HTTP error status:', response.status);
                toast.error('Error fetching course plan');
                dispatch({ type: CourseActionTypes.CoursePlanNotFound, data: '' });
            }
        })
        .catch((error) => {
            console.error('Fetch error:', error);
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
// Assuming `updateProgressStatus` should always receive an array of Progress objects
export const updateProgressStatus = (newProgressStatus: Progress[]) => {
    console.log('Dispatching UpdateProgressStatus action with payload:', newProgressStatus);
    return {
        type: 'UpdateProgressStatus',
        payload: newProgressStatus,
    };
};

// Assuming this action creator exists or you create a new one like this
export const updateCourseOptions = (options: Partial<CourseOptions>) => ({
    type: CourseActionTypes.UpdateCoursePlan,
    options,
});



// If newProgressStatus could be another type, replace `number` with the appropriate type
