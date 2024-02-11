import { CourseOptions } from "./CourseOptions";

export interface CourseContent {
    h1?: string;
    h2?: string;
    content?: string;
    [key: string]: any; // Consider specifying more precise types if possible
}

export interface Lesson {
    lesson_name: string;
    lesson_topics: string;
}



export interface Subsection {
    subsection: string;
    lessons: Lesson[];
}

export interface LessonPlan {
    subsection: Subsection[]; // Adjusted to use the Subsection interface
}

export interface CoursePlan {
    sectionName: string;
    sectionTime: string;
    sectionTopics: string;
    sectionDetails: string;
    sectionObjective: string;
    lessonPlan?: LessonPlan[]; // Adjusted to be an array of LessonPlan to match the detailed structure
}

export interface CourseData {
    courseId?: string;
    progressStatus?: Progress [] | null;
    detailedCoursePlan?: CoursePlan[];
    courseOptions?: CourseOptions | null;
    courseContent?: CourseContent | null;
}

export interface Progress {
    sectionId: number;
    lessonId: number;
}
