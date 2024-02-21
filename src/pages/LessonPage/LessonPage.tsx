import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { updateCourseContent, updateProgressStatus } from "../../actions/CourseActions";
import Button from '@mui/material/Button';
import {
    Container,
    Modal,
} from '@mui/material';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { QueryResolver } from '../../containers/QueryResolver/QueryResolver';
import ExplainOptions from './ExplainOptions';

function DataDisplayPage() {
  const dispatch = useDispatch()

  const { courseOptions, courseContent, detailedCoursePlan, progressStatus, isCourseLoading } = useAppSelector(state => state.courseReducer);

  
  const [selectionState, setSelectionState] = useState({
    isDirty: false,
    selection: '',
    anchorNode: '?',
    focusNode: '?',
    explanation: ''
  });

// Assuming progressStatus is guaranteed to have at least one item for this logic
// Correctly destructure the first item of progressStatus, considering it might be null
  const { sectionId, lessonId } = progressStatus?.[0] ?? { sectionId: 0, lessonId: -1 };

  const contentKey = `${sectionId}.${lessonId}`;

  const content = courseContent ? courseContent[contentKey] : undefined;

  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const [explanationModalOpen, setExplanationModalOpen] = useState(false);

  console.log("contentKey is", contentKey);

  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);


  const handleContinue = () => {
    let nextLessonId = lessonId + 1;
    dispatch(updateProgressStatus([{ sectionId: sectionId, lessonId: nextLessonId }]));
    window.scrollTo(0, 0);
  };

  const handleMouseUp = () => {
    const selectionObj = (window.getSelection && window.getSelection());

    if (selectionObj) {
        const selection = selectionObj.toString();
        const anchorNode = selectionObj.anchorNode;
        const focusNode = selectionObj.focusNode;
        const anchorOffset = selectionObj.anchorOffset;
        const focusOffset = selectionObj.focusOffset;

        if (anchorNode && focusNode) {
            const position = anchorNode.compareDocumentPosition(focusNode);
            let forward = false;

            if (position === anchorNode.DOCUMENT_POSITION_FOLLOWING) {
                forward = true;
            } else if (position === 0) {
                forward = (focusOffset - anchorOffset) > 0;
            }

            // let selectionStart = forward ? anchorOffset : focusOffset;
            // const selectionEnd = selectionStart + selection.length;

            console.log(`Selected text: ${selection}, focus: ${forward}`);

            setSelectionState({
                ...selectionState,
                selection: selection
            })
        }
    }
  };

  const handleExplain = async () => {
    setIsWaiting(true);

    const progressState = (progressStatus ?? 0).toString()

    const content = courseContent ? courseContent[progressState] : {}

    setExplanationModalOpen(true);

    const response = await fetch('http://localhost:8080/', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            course_content: content, 
            query: `Explain user selected text within the context of the lesson: ${selectionState.selection}`
        }), // body data type must match "Content-Type" header
    });

    if (response.ok) { // Checks if the response status is 2xx
        const jsonResponse = await response.json();
        console.log('Parsed JSON response:', jsonResponse);
        
        // Directly access courseContent without assuming an error field
        if (jsonResponse && jsonResponse.response) {
            console.log('Received response:', jsonResponse.response);
            setSelectionState({
                ...selectionState,
                explanation: jsonResponse.response
            })
        } else {
            setSelectionState({
                ...selectionState,
                explanation: 'Could not retrieve explanation'
            })
            // Handle the case where courseContent is not as expected
            console.error('Unexpected JSON structure:', jsonResponse);
        }
    } else {
        // Handle HTTP errors
        setSelectionState({
            ...selectionState,
            explanation: 'Could not retrieve explanation'
        })
        console.error('HTTP error status:', response.status);
    }

    setIsWaiting(false);
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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
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
                    <div 
                        onMouseUp={handleMouseUp}
                        onContextMenu={(e) => {
                            e.preventDefault(); // prevent the default behaviour when right clicked
                            setClicked(true);
                            setPoints({
                                x: e.pageX,
                                y: e.pageY,
                            });
                            console.log("Right Click", e.pageX, e.pageY);
                        }}>
                        {clicked && !isWaiting && <ExplainOptions clickExplain={handleExplain} top={points.y} left={points.x} />}
                        <Modal 
                            open={explanationModalOpen}
                            hideBackdrop={true}
                            onClose={() => setExplanationModalOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box sx={{ 
                                borderBottom: 0.1, 
                                p: 2, 
                                backgroundColor: "#F9F9F9", 
                                borderRadius: "10px 10px 10px 10px",
                                position: 'absolute', 
                                top: points.y, 
                                left: points.x}}>
                                <Typography variant='body1' sx={{
                                    color: "#000",
                                }}>{isWaiting ? 'Loading...' : selectionState.explanation}</Typography>
                            </Box>
                        </Modal>
                        <ReactMarkdown>{content.content}</ReactMarkdown>
                    </div>
                )}
            </Box>
            <Box textAlign="right" paddingTop="50px" display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" onClick={handlePrevious}>Previous</Button>
                <Button variant="contained" color="primary" onClick={handleContinue}>Continue</Button>
            </Box>
        </Container>
        <QueryResolver></QueryResolver>
    </Box>
  );

}
  
export default DataDisplayPage;
