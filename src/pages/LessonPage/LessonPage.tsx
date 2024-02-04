import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { updateCourseContent } from "../../actions/CourseActions";
import { CourseData } from '../../models/CourseOptions/CourseData';

function DataDisplayPage() {
  const dispatch = useDispatch()

  const { courseOptions, courseContent, detailedCoursePlan, isCourseLoading } = useAppSelector(state => state.courseReducer)
    
  const [data, setData] = useState<CourseData>({
        courseOptions: courseOptions,
        courseContent: courseContent,
        detailedCoursePlan: detailedCoursePlan,
    });

  const handleContinue = () => {
    const numKeys = courseContent ? Object.keys(courseContent).length : 0;
    
    setData(prevData => ({
      ...prevData,
      progressStatus: Math.min((prevData.progressStatus ?? 0) + 1, numKeys),
    }));
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  
  const handlePrevious = () => {
    setData(prevData => ({
      ...prevData,
      progressStatus: Math.max((prevData.progressStatus ?? 0) - 1, 0),
    }));
    window.scrollTo(0, 0); // Scroll to the top of the page
  };
  
  
  useEffect(() => {
    // Function to check if we need to fetch data

      // Function to increment progressStatus

    const shouldFetchData = () => {
      const nextProgressState = ((data.progressStatus ?? 0) + 1).toString();
      // Check if content for the next progress status is already available
      return (data.courseContent && !data.courseContent[nextProgressState]);
    };
  
    if (shouldFetchData()) {
        dispatch(updateCourseContent(data));
    } 
  }, [data.progressStatus, data.courseContent]); // Depend on progressStatus and courseContent
  
  if (isCourseLoading) return <div>Loading...</div>;
  if (!data.courseContent) return <div>No content found...</div>;

  const progressState = (data.progressStatus ?? 0).toString();
  const content = data.courseContent[progressState];

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
