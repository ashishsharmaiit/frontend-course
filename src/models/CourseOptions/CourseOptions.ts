
export interface CourseOptions {
    readonly topic?: string;
    readonly durationInHours?: number;
    readonly teachingStyle?: string;
    readonly focusOn?: string;
    readonly purposeFor?: string;
    readonly previousKnowledge?: string;
    readonly otherConsiderations?: string;
}

export interface CourseFirstOptions {
    readonly topic: string;
}
