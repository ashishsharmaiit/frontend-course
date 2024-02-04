import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import initialCourseData from './courseData.json';

interface CourseContent {
  h1?: string;
  h2?: string;
  content?: string;
}

interface CourseData {
  course_plan: Array<any>; // You should define a specific type for course_plan items
  course_options: {
    topic: string;
    duration: string;
    teachingStyle: string;
    focusOn: string;
    purposeFor: string;
    previousKnowledge: string;
    otherConsiderations: string;
  };
  Progress_Status: number;
  course_id: string;
  course_content: Record<string, CourseContent>;
}

const DataDisplayPage: React.FC = () => {
  const [data, setData] = useState<CourseData>(initialCourseData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = () => {
    setData(prevData => ({
      ...prevData,
      Progress_Status: Math.min(prevData.Progress_Status + 1, Object.keys(prevData.course_content).length),
    }));
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  
  const handlePrevious = () => {
    setData(prevData => ({
      ...prevData,
      Progress_Status: Math.max(prevData.Progress_Status - 1, 0),
    }));
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  
  
  useEffect(() => {
    // Function to check if we need to fetch data

      // Function to increment Progress_Status

    const shouldFetchData = () => {
      const nextProgressState = (data.Progress_Status + 1).toString();
      // Check if content for the next progress status is already available
      return !data.course_content[nextProgressState];
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Send current state data
        });
  
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
  
        const receivedData: Partial<CourseData> = await response.json(); // Use Partial to indicate that any of the CourseData properties may be present
        console.log('Received Data:', receivedData);
  
        // Update state based on the received data
        setData(prevData => {
          const updatedData: CourseData = {
            ...prevData,
            course_id: receivedData.course_id || prevData.course_id, // Update course_id if present, otherwise keep existing
            course_content: { ...prevData.course_content, ...receivedData.course_content }, // Merge new course content with existing
            course_plan: receivedData.course_plan ? receivedData.course_plan : prevData.course_plan,
          };
  
          // Log the updated state
          console.log('Updated state:', updatedData);
          return updatedData;
        });
  
        setIsLoading(false);
  
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };
  
    if (shouldFetchData()) {
      fetchData();
    } else {
      setIsLoading(false); // Set loading to false since no fetch is needed
    }
  }, [data.Progress_Status, data.course_content]); // Depend on Progress_Status and course_content
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const progressState = data.Progress_Status.toString();
  const content = data.course_content[progressState];

  return (
    <Container maxWidth="md" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
      <Box textAlign="center" paddingBottom="50px">
        {content?.h1 && (
          <Typography variant="h3" gutterBottom>{content.h1}</Typography>
        )}
        {content?.h2 && (
          <Typography variant="h5" gutterBottom>{content.h2}</Typography>
        )}
      </Box>
      <Box textAlign="left" paddingBottom="50px">
        {content?.content && (
          <Typography style={{ whiteSpace: 'pre-wrap' }}>{content.content}</Typography>
        )}
      </Box>
      <Box textAlign="right" paddingTop="50px" display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handlePrevious}>Previous</Button>
        <Button variant="contained" color="primary" onClick={handleContinue}>Continue</Button>
      </Box>
    </Container>
  );
};

export default DataDisplayPage;
