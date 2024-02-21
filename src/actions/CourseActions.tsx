import { CoursePlan, CourseContent, CourseData, Progress } from "../models/CourseOptions/CourseData";
import { CourseOptions } from "../models/CourseOptions/CourseOptions";
import { CourseActionTypes } from "../reducers/CourseReducers";
import { toast } from "react-toastify"


/*
const courseGenUrl = 'http://localhost:8084/'
const lessonContentUrl = 'http://localhost:8080/'
const welcomeUrl = 'http://localhost:8082/'
*/

const courseGenUrl = 'https://us-central1-socratiq.cloudfunctions.net/create_course_plan'
const lessonContentUrl = 'https://us-central1-socratiq.cloudfunctions.net/process_lesson_data'
const welcomeUrl = 'https://us-central1-socratiq.cloudfunctions.net/welcome_with_plan'


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
    courseOptions: CourseOptions, courseContent: CourseContent, detailedCoursePlan: CoursePlan[]
): any => {
    return function (dispatch: any) {
        console.log('getting course plan with below inputs:', courseOptions, 'and ', courseContent, 'and', detailedCoursePlan);

        fetch(courseGenUrl, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"courseOptions": courseOptions, "courseContent": courseContent, "detailedCoursePlan": detailedCoursePlan}), // body data type must match "Content-Type" header
        })
        .then(async (response) => {
            if (response.status !== 204) {
                const data = await response.clone().json();
                console.log("received data", data);

                let parsedData;
                if (typeof data === "string") {
                    try {
                        parsedData = JSON.parse(data);
                    } catch (error) {
                        console.error("Error parsing JSON string:", error);
                        // Handle the error (e.g., set parsedData to null or an empty object)
                        parsedData = {}; // or null, depending on how you want to handle this case
                    }
                } else {
                    // If `data` is already an object, use it directly
                    parsedData = data;
                }
                
                console.log("Parsed data", parsedData);
                console.log("type of data", typeof parsedData);
                console.log("Trying to access detailedCoursePlan directly:", parsedData['detailedCoursePlan']);
                
                const detailedCoursePlan = parsedData.detailedCoursePlan;
                
                console.log("detailedCoursePlan", detailedCoursePlan);
                                
                dispatch({
                    type: CourseActionTypes.UpdateOnlyCoursePlan,
                    data: detailedCoursePlan, // Assuming your reducer expects 'data' to contain the detailedCoursePlan
                });
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
