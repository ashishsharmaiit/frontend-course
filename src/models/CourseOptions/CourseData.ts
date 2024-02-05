import { CourseOptions } from "./CourseOptions";

export interface CourseContent {
    h1?: string;
    h2?: string;
    content?: string;
}

export interface Lesson {
    content: string;
    lessonTitle: string;
    uniqueLessonId: number;
}

export interface Chapter {
    lessons: Lesson[];
    chapterTitle: string;
}

export interface LessonPlan {
    chapters: Chapter[];
}

export interface CoursePlan {
    sectionName: string;
    sectionTime: string;
    sectionNumber: number;
    sectionTopics: string;
    sectionObjective: string;
    lessonPlan?: LessonPlan;
}

export interface CourseData {
    courseId?: string;
    progressStatus?: number;
    detailedCoursePlan?: CoursePlan[]; // You should define a specific type for course_plan items
    courseOptions?: CourseOptions | null;
    courseContent?: Record<string, CourseContent> | null;
}

