import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { updateCourseContent, updateProgressStatus } from "../../actions/CourseActions";




function DataDisplayPage() {
  const dispatch = useDispatch()

  const { courseOptions, courseContent, detailedCoursePlan, courseId, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

  // Convert courseId from potentially null to undefined to satisfy TypeScript
  const safeCourseId = courseId === null ? undefined : courseId;
  
  const progressState = (progressStatus ?? 0).toString();
  const content = courseContent ? courseContent[progressState] : undefined; // Ensure courseContent exists
  
  const handleContinue = () => {
    const newProgressStatus = Math.min((progressStatus ?? 0) + 1, Object.keys(courseContent || {}).length);
    console.log('New progress status:', newProgressStatus); // Add logging for debugging
    dispatch(updateProgressStatus(newProgressStatus));
    window.scrollTo(0, 0);
  };
  
  
  
  const handlePrevious = () => {
    const newProgressStatus = Math.max((progressStatus ?? 0) - 1, 0);
    dispatch(updateProgressStatus(newProgressStatus));
    window.scrollTo(0, 0);
  };
    
  useEffect(() => {
    const shouldFetchData = () => {
      const currentStateNumber = parseInt(progressState, 10);
      const nextState = currentStateNumber + 1;
      
      // Check if there's no content for the current state or if prefetching is needed for the next state.
      const isCurrentStateMissingContent = !courseContent || !courseContent[progressState];
      const isNextStateMissingContent = !courseContent || !courseContent[nextState.toString()];
  
      // Fetch if content is missing for the current or next state, regardless of initialDataFetched.
      return isCurrentStateMissingContent || isNextStateMissingContent;
    };
  
    if (shouldFetchData()) {
      dispatch(updateCourseContent({ courseOptions, courseContent, detailedCoursePlan, courseId: safeCourseId, progressStatus }));
    }
  }, [dispatch, progressStatus, progressState, courseContent, courseOptions, detailedCoursePlan, safeCourseId]);
  

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
