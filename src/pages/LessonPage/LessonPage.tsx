import React, { useState, useEffect } from 'react';

interface Lesson {
  LessonTitle: string;
  Content: string;
}

interface Chapter {
  ChapterTitle: string;
  Lessons: Lesson[];
}

interface LessonPlan {
  Chapters: Chapter[];
}

interface Data {
  inserted_id: string;
  lesson_plan: LessonPlan;
  detailed_content: string;
}

const DataDisplayPage: React.FC = () => {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:8080')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: Data) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Data from Server</h1>
            <h2>Inserted ID: {data?.inserted_id}</h2>
            <div>
              <h3>Lesson Plan:</h3>
              <pre>{JSON.stringify(data?.lesson_plan, null, 2)}</pre>
            </div>
            <div>
              <h3>Detailed Content:</h3>
              <pre>{data?.detailed_content}</pre>
            </div>
        </div>
    );
};

export default DataDisplayPage;
