import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from '../../store';




function DataDisplayPage() {

  const { courseContent, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

  console.log("Course Content:", courseContent);
  console.log("Progress Status:", progressStatus);
  console.log("Is Course Loading:", isCourseLoading);
  
  const progressState = (progressStatus ?? 0).toString();
  const content = courseContent ? courseContent[progressState] : undefined; // Ensure courseContent exists

    console.log("Progress State:", progressState);
  console.log("Content for current state:", content);
  
    
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
    </Container>
  );
};

export default DataDisplayPage;
