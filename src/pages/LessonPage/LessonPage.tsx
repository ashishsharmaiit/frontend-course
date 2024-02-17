import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { updateCourseContent, updateProgressStatus } from "../../actions/CourseActions";
import Button from '@mui/material/Button';
import {
  Stack,
  Container,
} from '@mui/material';
import { QueryResolver } from "../../containers/QueryResolver/QueryResolver";
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

function DataDisplayPage() {
  const dispatch = useDispatch()

  const { courseOptions, courseContent, detailedCoursePlan, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

// Assuming progressStatus is guaranteed to have at least one item for this logic
// Correctly destructure the first item of progressStatus, considering it might be null
  const { sectionId, lessonId } = progressStatus?.[0] ?? { sectionId: 0, lessonId: -1 };

  const contentKey = `${sectionId}.${lessonId}`;
  const content = courseContent ? courseContent[contentKey] : undefined;

  console.log("contentKey is", contentKey);


  const handleContinue = () => {
    let nextLessonId = lessonId + 1;
    dispatch(updateProgressStatus([{ sectionId: sectionId, lessonId: nextLessonId }]));
    window.scrollTo(0, 0);
  };
  
  
  
  const handlePrevious = () => {
    window.scrollTo(0, 0);
  };
  
  useEffect(() => {
    // Dispatches the updateCourseContent action only once when the component mounts
    dispatch(updateCourseContent({ courseOptions, courseContent, detailedCoursePlan, progressStatus }));
  }, [sectionId, lessonId]); // Removed all dependencies to ensure this runs only once on component mount
  

    if (isCourseLoading) {
      console.log("Content is loading...");
      return <div>Loading...</div>;
    }
  
  if (!content) {
    console.log("No content found for progressState:", 0.-1);
    return <div>No content found...</div>;
  }
    

  return (
    <Stack direction="row" justifyContent="center" spacing={2}>
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
            <ReactMarkdown>{content.content}</ReactMarkdown>
            )}
      </Box>
      <Box textAlign="right" paddingTop="50px" display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handlePrevious}>Previous</Button>
                <Button variant="contained" color="primary" onClick={handleContinue}>Continue</Button>
            </Box>
        </Container>
        {/*<Container style={{ paddingTop: '100px', paddingBottom: '50px' }}>
            <QueryResolver></QueryResolver>
        </Container>*/}
    </Stack>
  );

}
  
export default DataDisplayPage;
