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
}

export interface CourseAction {
    data: CoursePlan[];
    content: CourseContent | null;
    options: CourseOptions | null;
    type: CourseActionTypes;
    payload?: Progress[] | null; // Add this line, assuming payload is a number
    id: string | null;
}

const initCourseContent = {
    h1: "Section 1: Introduction to AI",
    h2: "Chapter 1: Introduction to AI",
    content: "Lesson 1: What is AI?\n\nWelcome to the exciting world of Artificial Intelligence (AI)! 🌟 In this lesson, we will embark on a journey to understand the fundamentals of AI, its impact, and its incredible potential. So, buckle up and get ready to dive into the realm of AI with me! 🚀\n\n🔍 Exploring Artificial Intelligence:\n\nArtificial Intelligence, often abbreviated as AI, refers to the simulation of human intelligence processes by machines, especially computer systems. It involves the development of algorithms and models that enable machines to perform tasks that typically require human intelligence. These tasks may include problem-solving, learning, perception, and decision-making.\n\n🎯 Goals of AI:\n\nThe primary goal of AI is to create systems that can mimic human cognitive abilities, such as reasoning, problem-solving, and learning from experience. AI aims to develop machines that can perceive their environment, understand natural language, and make decisions based on the available information. Ultimately, the goal is to enhance efficiency, automate complex tasks, and improve decision-making processes across various domains.\n\n💡 Significance of AI in Today's World:\n\nAI has rapidly transformed numerous industries, including healthcare, finance, transportation, and entertainment. It has revolutionized the way we interact with technology, paving the way for innovations like virtual assistants, autonomous vehicles, and personalized recommendations. The impact of AI is profound, shaping the future of work, communication, and everyday life.\n\n🌐 Narrow AI vs. General AI:\n\nWhen we talk about AI, it's essential to understand the distinction between narrow AI and general AI. Narrow AI, also known as weak AI, is designed to perform specific tasks within a limited domain. Examples of narrow AI include virtual personal assistants like Siri and Alexa, as well as recommendation algorithms used by streaming platforms. On the other hand, general AI, also referred to as strong AI, aims to exhibit human-like intelligence and versatility across a wide range of tasks and domains. While narrow AI is prevalent in today's applications, the pursuit of general AI remains a fascinating and ambitious endeavor.\n\n🚀 Embracing the AI Journey:\n\nAs we delve deeper into the world of AI, it's important to recognize the potential and the ethical considerations associated with its development. AI presents us with incredible opportunities to innovate, solve complex problems, and improve the quality of life. However, it also raises important questions about privacy, bias, and the societal impact of intelligent systems. By understanding the foundations of AI, we can actively participate in shaping its future and leveraging its capabilities for the greater good.\n\n🌟 Conclusion:\n\nIn this lesson, we've laid the groundwork for our exploration of AI, uncovering its definition, goals, significance, and the distinction between narrow AI and general AI. As we continue our journey, we'll delve into specific applications, ethical considerations, and the evolving landscape of AI. So, get ready to be inspired and empowered by the possibilities of AI! 🌍"
}

const initState: courseReducerProps = {
    detailedCoursePlan: [],
    courseOptions: null,
    courseContent: {"0": initCourseContent},
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