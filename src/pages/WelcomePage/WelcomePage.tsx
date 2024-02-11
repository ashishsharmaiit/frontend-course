import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { updateProgressStatus } from "../../actions/CourseActions";
import TextField from '@mui/material/TextField'; // Import TextField


function DataDisplayPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  
  const { courseContent, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

  console.log("Course Content:", courseContent);
  console.log("Progress Status:", progressStatus);
  console.log("Is Course Loading:", isCourseLoading);
  
  const content = courseContent ? courseContent["-1.-1"] : undefined; // Ensure courseContent exists

  console.log("Content for current state:", content);
  
  const handleContinue = () => {
    dispatch(updateProgressStatus([{ sectionId: 0, lessonId: -1 }]));
    window.scrollTo(0, 0);
    navigate("/lesson");
  };
    
  if (isCourseLoading) {
    console.log("Content is loading...");
    return <div>Loading...</div>;
  }

  if (!content) {
    console.log("No content found for progressState:", -1);
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
      <Box textAlign="center" paddingBottom="50px">
        <TextField
          label="Your Feedback" // Label for the TextField
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Box>
      <Box textAlign="center" paddingTop="100px" display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={handleContinue}>Start the Course</Button>
      </Box>
    </Container>
  );
};

export default DataDisplayPage;
