import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//import initialCourseData from './courseData.json';
import { CourseData } from "../../models/CourseOptions/CourseData";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { updateCourseContent, updateProgressStatus } from "../../actions/CourseActions";




function DataDisplayPage() {
  const dispatch = useDispatch()

  const { courseOptions, courseContent, detailedCoursePlan, courseId, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

  // Convert courseId from potentially null to undefined to satisfy TypeScript
  const safeCourseId = courseId === null ? undefined : courseId;
  
  /*
  const [data, setData] = useState<CourseData>({
    courseOptions: courseOptions,
    courseContent: courseContent,
    detailedCoursePlan: detailedCoursePlan,
    courseId: courseId,
    progressStatus: progressStatus

  });*/

  /*const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);*/
  const [initialDataFetched, setInitialDataFetched] = useState(false);

  const progressState = (progressStatus ?? 0).toString();
  const content = courseContent ? courseContent[progressState] : undefined; // Ensure courseContent exists
  
  const handleContinue = () => {
    const newProgressStatus = Math.min(progressStatus ?? 0 + 1, Object.keys(courseContent || {}).length);
    dispatch(updateProgressStatus(newProgressStatus));
    window.scrollTo(0, 0);
  };
  
  
  const handlePrevious = () => {
    const newProgressStatus = Math.max((progressStatus ?? 0) - 1, 0);
    dispatch(updateProgressStatus(newProgressStatus));
    window.scrollTo(0, 0);
  };
  
  
  
  console.log('progressStatus:', progressStatus);
  console.log('progressState:', progressState);
  console.log('courseContent:', courseContent);
  console.log('content for current progressState:', content);

  
  useEffect(() => {
    const shouldFetchData = () => {
      // Adjust condition to avoid continuous fetching
      return !initialDataFetched && (!courseContent || !courseContent[progressState]);
    };

    if (shouldFetchData()) {
      dispatch(updateCourseContent({ courseOptions, courseContent, detailedCoursePlan, courseId: safeCourseId, progressStatus }));
      setInitialDataFetched(true); // Mark as fetched to prevent re-fetching
    }
  }, [dispatch, progressStatus, progressState, initialDataFetched, courseContent]);

    if (isCourseLoading) {
      console.log("Content is loading...");
      return <div>Loading...</div>;
    }
  
    if (!content) {
      console.log("No content found for progressState:", progressState);
      return <div>No content found...</div>;
    }
  
    
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
