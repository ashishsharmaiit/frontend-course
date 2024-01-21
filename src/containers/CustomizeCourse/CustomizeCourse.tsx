import * as React from 'react';
import { 
    Typography, 
    Box, 
    TextField, 
    ToggleButtonGroup, 
    ToggleButton, 
    Button, 
    Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CourseOptions } from '../../models/CourseOptions/CourseOptions';

function CustomizeCourse({
    handleSubmit
} : {
    handleSubmit: (courseOptions: CourseOptions) => void
}) {
  const [duration, setDuration] = React.useState("5");

  const [courseTopic, setCourseTopic] = React.useState('Neural Net for Robotics');

  const [teachingStyle, setTeachingStyle] = React.useState('easy to understand language');

  const [customizationData, setCustomizationData] = React.useState({
    topic: courseTopic ?? "",
    duration: `${duration} weeks` ?? "",
    teachingStyle: teachingStyle ?? "",
    focusOn: "",
    purposeFor: "",
    previousKnowledge: "",
    otherConsiderations: ""
  });

  const handleTeachingStyle = (event: React.MouseEvent<HTMLElement, MouseEvent>, newTeachingStyle: string) => {
    if (newTeachingStyle !== null) {
      setTeachingStyle(newTeachingStyle);
      setCustomizationData({
        ...customizationData,
        teachingStyle: newTeachingStyle
      });
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(customizationData);
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 2 }}>
      <Typography variant="h6" gutterBottom component="div">
        Customize
      </Typography>

      <form onSubmit={handleFormSubmit} style={{ background: "none" }}>
        <Box sx={{ my: 2 }}>
            <Typography gutterBottom>I want to learn about</Typography>
            <TextField 
                fullWidth 
                select 
                defaultValue="Neural Net for Robotics" 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCourseTopic(event.target.value);
                    setCustomizationData({
                        ...customizationData,
                        topic: event.target.value
                    });
                }}
                SelectProps={{ native: true }}>
            <option>Neural Net for Robotics</option>
            <option>Programming in React</option>
            <option>Large Language Models</option>
            </TextField>
        </Box>

        <Box sx={{ my: 2 }}>
            <Typography gutterBottom>In (weeks)</Typography>
            <TextField 
                fullWidth 
                select 
                defaultValue={2}
                type="number"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDuration(event.target.value);
                    setCustomizationData({
                        ...customizationData,
                        duration: `${event.target.value} weeks`
                    });
                }}
                SelectProps={{ native: true }}>
            </TextField>
        </Box>

        <Box sx={{ my: 2 }}>
            <Typography gutterBottom>Teaching style</Typography>
            <ToggleButtonGroup
            value={teachingStyle}
            exclusive
            onChange={handleTeachingStyle}
            fullWidth
            >
            <ToggleButton value="easy">Easy to understand language</ToggleButton>
            <ToggleButton value="quiz">Quiz me after every lesson</ToggleButton>
            <ToggleButton value="assignments">Give practice assignments</ToggleButton>
            </ToggleButtonGroup>
        </Box>

        <Stack direction="column" spacing={2}>
            <Button variant="outlined" startIcon={<AddIcon />}>Focus more on</Button>
            <Button variant="outlined" startIcon={<AddIcon />}>I already know</Button>
            <Button variant="outlined" startIcon={<AddIcon />}>I want to learn this for</Button>
            <Button variant="outlined" startIcon={<AddIcon />}>Something else to consider</Button>
        </Stack>

        <Button variant="outlined" color="secondary" type="submit">Generate</Button>
      </form>
    </Box>
  );
};

export default CustomizeCourse;
