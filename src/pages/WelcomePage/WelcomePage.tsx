import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField'; // Import TextField
import React, { useState } from 'react';
import { updateCourseOptions, generateFirstCoursePlan, generateCoursePlan, updateProgressStatus } from '../../actions/CourseActions'; // Adjust the import path as needed
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown


function DataDisplayPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [inputKey, setInputKey] = useState(Date.now());


  const { courseOptions, courseContent, detailedCoursePlan, progressStatus, isCourseLoading } = useAppSelector(state => state.course);
  const [background, setBackground] = useState('');
  const [purposeOfLearning, setpurposeOfLearning] = useState('');
  const [durationInHours, setdurationInHours] = useState('');


  const shouldUpdatePurpose = courseOptions?.background;
  const shouldUpdatedurationInHours = courseOptions?.purposeOfLearning;


  console.log("Course Content:", courseContent);
  console.log("Progress Status:", progressStatus);
  console.log("Is Course Loading:", isCourseLoading);
  
  const { sectionId, lessonId } = progressStatus?.[0] ?? { sectionId: -1, lessonId: -1 };

  const contentKey = `${sectionId}.${lessonId}`;
  const content = courseContent ? courseContent[contentKey] : undefined;

  console.log("Content for current state:", content);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (shouldUpdatedurationInHours) {
      setdurationInHours(value);
    } else if (shouldUpdatePurpose) {
      setpurposeOfLearning(value);
    } else {
      setBackground(value);
    }
  };

  useEffect(() => {
    if (contentKey === "-1.2" && courseContent && courseContent[contentKey] && courseOptions!= null) {
      // Assuming courseOptions is available in your component's state or props
      const currentCourseOptions = courseOptions; // Ensure this is correctly sourced
      const currentCourseContent = courseContent; // Specific content for -1.-4
      const currentdetailedCoursePlan = detailedCoursePlan; // Specific content for -1.-4

      // Dispatch the generateCoursePlan action with currentCourseOptions and currentCourseContent
      dispatch(generateCoursePlan(currentCourseOptions, currentCourseContent, currentdetailedCoursePlan));
    }
  }, [contentKey, courseContent, dispatch]); // Add dispatch to the dependency array if it's not stable
  
  
  useEffect(() => {
// Assuming detailedCoursePlan is already defined and populated as shown above
    if (detailedCoursePlan && detailedCoursePlan.length > 0 && courseOptions!= null  && courseContent) {
      // Check if the first item in detailedCoursePlan has the lessonPlan property
      if (!detailedCoursePlan[0].hasOwnProperty('lessonPlan')) {
        const currentCourseOptions = courseOptions; // Ensure this is correctly sourced
        const currentCourseContent = courseContent; // Specific content for -1.-4
        const currentdetailedCoursePlan = detailedCoursePlan; // Specific content for -1.-4
  
        dispatch(generateCoursePlan(currentCourseOptions, currentCourseContent, currentdetailedCoursePlan));
        } else {
          console.log("lessonPlan variable exists in the first index of detailedCoursePlan.");
      }
    } else {
      console.log("detailedCoursePlan is empty or not defined.");
    }
  }, [detailedCoursePlan, dispatch]); // Add dispatch to the dependency array if it's not stable



  const textFieldProps = (() => {
    if (shouldUpdatedurationInHours) {
      return {
        label: "Duration in Hours",
        value: durationInHours,
      };
    } else if (shouldUpdatePurpose) {
      return {
        label: "Purpose Of Learning",
        value: purposeOfLearning,
      };
    } else {
      return {
        label: "Your background",
        value: background,
      };
    } 
  })();
  
  const handleEnterBackground = () => {
    if (contentKey === "-1.2") {
      // Update progressStatus to the initial course state, `0.-1`
      dispatch(updateProgressStatus([{ sectionId: 0, lessonId: -1 }]));
  
      // Navigate to the course start page or the first lesson
      navigate('/lesson'); // Adjust the path as needed for your application
  
      // Optionally, reset any state or perform additional setup here
    } else {
    if (shouldUpdatedurationInHours) {
      const updatedOptions = { durationInHours: durationInHours };
      dispatch(updateCourseOptions(updatedOptions));
    }
    else if (shouldUpdatePurpose) {
      const updatedOptions = { purposeOfLearning: purposeOfLearning };
      dispatch(updateCourseOptions(updatedOptions));
    } else {
      const updatedOptions = { background: background };
      dispatch(updateCourseOptions(updatedOptions));
    }

    let nextLessonId = lessonId + 1;
    dispatch(updateProgressStatus([{ sectionId: sectionId, lessonId: nextLessonId }]));
    window.scrollTo(0, 0);
    
    // Reset the input field by updating the key
    setBackground(''); // Clear the background state
    setInputKey(Date.now()); // Update the key to force re-render of the TextField
  }
  };
  

  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the effect on initial mount, only run on courseOptions changes afterwards
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (courseOptions !== null && !isCourseLoading) {
      // Since it's not the initial mount and courseOptions is not null, dispatch the action
      dispatch(generateFirstCoursePlan(courseOptions));
    } else {
      console.error("courseOptions is null, cannot generate first course plan.");
    }
  }, [dispatch, courseOptions]); // Dependency array remains unchanged


    
  if (isCourseLoading) {
    console.log("Content is loading...");
    return <div>Loading...</div>;
  }

  if (!content) {
    console.log("No content found for contentKey:", contentKey);
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
      <Box textAlign="left" paddingBottom="20px">
        {content?.content && (
            <ReactMarkdown>{content.content}</ReactMarkdown>
            )}
      </Box>

        <Box textAlign="center" paddingBottom="10px">
        {contentKey !== "-1.2" && (
          <TextField
            key={inputKey}
            label={textFieldProps.label}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={textFieldProps.value}
            onChange={handleInputChange}
          />
        )}
      </Box>

            <Box textAlign="center" paddingTop="1px" display="flex" justifyContent="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleEnterBackground}>
          {contentKey === "-1.2" ? "Start the Course" : "Submit"}
        </Button>
      </Box>


    </Container>
  );
};

export default DataDisplayPage;
