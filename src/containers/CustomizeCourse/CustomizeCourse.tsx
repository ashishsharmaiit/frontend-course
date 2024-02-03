import * as React from 'react';
import { 
    Typography, 
    Box, 
    TextField,
    Button, 
    Stack } from '@mui/material';
import { CourseOptions } from '../../models/CourseOptions/CourseOptions';
import AddButton from '../../components/AddButton/AddButton';
import DynamicList from '../../components/DynamicList/DynamicList';

function CustomizeCourse({
    initOptions,
    handleSubmit
} : {
    initOptions: CourseOptions | null,
    handleSubmit: (courseOptions: CourseOptions) => void
}) {
  // primary input fields   
  const [duration, setDuration] = React.useState(initOptions?.duration ?? "5");
  const [courseTopic, setCourseTopic] = React.useState(initOptions?.topic ?? 'Neural Net for Robotics');
  const [teachingStyle, setTeachingStyle] = React.useState({text: initOptions?.teachingStyle ?? '', count: 1});

  // secondary input fields
  const [focus, setFocus] = React.useState({text: '', count: 0});
  const [purpose, setPurpose] = React.useState({text: '', count: 0});
  const [knowledge, setKnowledge] = React.useState({text: '', count: 0}); 
  const [considerations, setConsiderations] = React.useState({text: '', count: 0});   

  const [customizationData, setCustomizationData] = React.useState({
    topic: courseTopic ?? "",
    duration: `${duration} weeks` ?? "",
    teachingStyle: teachingStyle.text ?? "",
    focusOn: focus.text ?? "",
    purposeFor: purpose.text ?? "",
    previousKnowledge: knowledge.text ?? "",
    otherConsiderations: considerations.text ?? ""
  });

  const handleTeachingStyle = (newTeachingStyle: string, countItem: number) => {
    if (newTeachingStyle !== null) {
      setTeachingStyle({
        ...teachingStyle,
        text: newTeachingStyle,
        count: countItem
      });
      setCustomizationData({
        ...customizationData,
        teachingStyle: newTeachingStyle
      });
    }
  };

  const handleFocus = (newFocus: string, countItem: number) => {
    if (newFocus !== null) {
      setFocus({
        ...focus,
        text: newFocus,
        count: countItem
      });
      setCustomizationData({
        ...customizationData,
        focusOn: newFocus
      });
    }
  };

  const handlePurpose = (newPurpose: string, countItem: number) => {
    if (newPurpose !== null) {
      setPurpose({
        ...purpose,
        text: newPurpose,
        count: countItem
      });
      setCustomizationData({
        ...customizationData,
        purposeFor: newPurpose
      });
    }
  };

  const handleKnowledge = (newKnowledge: string, countItem: number) => {
    if (newKnowledge !== null) {
      setKnowledge({
        ...knowledge,
        text: newKnowledge,
        count: countItem
      });
      setCustomizationData({
        ...customizationData,
        previousKnowledge: newKnowledge
      });
    }
  };

  const handleConsiderations = (newConsiderations: string, countItem: number) => {
    if (newConsiderations !== null) {
      setConsiderations({
        ...considerations,
        text: newConsiderations,
        count: countItem
      });
      setCustomizationData({
        ...customizationData,
        otherConsiderations: newConsiderations
      });
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(customizationData);
  }

  return (
    <Box sx={{ 
        width: '100%', 
        maxWidth: 360, 
        bgcolor: '#D9D9D9',
        borderRadius: "40px",
        p: 2 }}>
      <Typography gutterBottom component="div" align="center" sx={{
            color: "#000",
            fontSize: "32px",
            fontWeight: "800",
          }}>
        Customize
      </Typography>

      <form onSubmit={handleFormSubmit} style={{ background: "none" }}>
        <Box sx={{ my: 2 }}>
            <Typography gutterBottom sx={{
                color: "#000",
                fontSize: "15px",
                fontWeight: "500",
                paddingBottom: "2px"
            }}>
                I want to learn about
            </Typography>
            <Box display="flex" justifyContent="flex-end">
                <TextField 
                    variant="standard"
                    fullWidth 
                    defaultValue="Neural Net for Robotics" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCourseTopic(event.target.value);
                        setCustomizationData({
                            ...customizationData,
                            topic: event.target.value
                        });
                    }}
                    InputProps={{ disableUnderline: true }}
                    SelectProps={{ native: true }}
                    sx={{
                        width: "250px",
                        bgcolor: "#FFF",
                        borderRadius: "20px",
                        marginLeft: "2px",
                        paddingLeft: "8px",
                        paddingRight: "2px"
                    }}>
                </TextField>
            </Box>
        </Box>

        <Box sx={{ my: 2 }}>
            <Typography gutterBottom sx={{
                color: "#000",
                fontSize: "15px",
                fontWeight: "500",
                paddingBottom: "2px"
            }}>
                In (weeks)
            </Typography>
            <Box display="flex" justifyContent="flex-end">
                <TextField 
                    variant="standard"
                    fullWidth 
                    defaultValue={2}
                    type="number"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setDuration(event.target.value);
                        setCustomizationData({
                            ...customizationData,
                            duration: `${event.target.value} weeks`
                        });
                    }}
                    InputProps={{ disableUnderline: true }}
                    SelectProps={{ native: true }}
                    sx={{
                        width: "150px",
                        bgcolor: "#FFF",
                        borderRadius: "20px",
                        paddingLeft: "8px",
                        paddingRight: "12px"
                    }}>
                </TextField>
            </Box>
        </Box>

        <Box sx={{ my: 2 }}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography gutterBottom sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "500",
                    paddingBottom: "2px"
                }}>
                    Teaching style
                </Typography>
                <AddButton height={"18px"} width={"18px"} onClick={() => (
                    setTeachingStyle({
                        ...teachingStyle,
                        count: teachingStyle.count+1,
                    })
                )}></AddButton>
            </Stack>
            <DynamicList onAddItem={teachingStyle.count} onChange={handleTeachingStyle}></DynamicList>
        </Box>

        <Box sx={{ my: 2 }}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography gutterBottom sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "500",
                    paddingBottom: "2px"
                }}>
                    Focus more on
                </Typography>
                <AddButton height={"18px"} width={"18px"} onClick={() => (
                    setFocus({
                        ...focus,
                        count: focus.count+1,
                    })
                )}></AddButton>
            </Stack>
            <DynamicList onAddItem={focus.count} onChange={handleFocus}></DynamicList>
        </Box>

        <Box sx={{ my: 2 }}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography gutterBottom sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "500",
                    paddingBottom: "2px"
                }}>
                    I already know
                </Typography>
                <AddButton height={"18px"} width={"18px"} onClick={() => (
                    setKnowledge({
                        ...knowledge,
                        count: knowledge.count+1,
                    })
                )}></AddButton>
            </Stack>
            <DynamicList onAddItem={knowledge.count} onChange={handleKnowledge}></DynamicList>
        </Box>

        <Box sx={{ my: 2 }}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography gutterBottom sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "500",
                    paddingBottom: "2px"
                }}>
                    I want to learn this for
                </Typography>
                <AddButton height={"18px"} width={"18px"} onClick={() => (
                    setPurpose({
                        ...purpose,
                        count: purpose.count+1,
                    })
                )}></AddButton>
            </Stack>
            <DynamicList onAddItem={purpose.count} onChange={handlePurpose}></DynamicList>
        </Box>

        <Box sx={{ my: 2 }}>
            <Stack direction={"row"} justifyContent="space-between">
                <Typography gutterBottom sx={{
                    color: "#000",
                    fontSize: "15px",
                    fontWeight: "500",
                    paddingBottom: "2px"
                }}>
                    Something else to consider
                </Typography>
                <AddButton height={"18px"} width={"18px"} onClick={() => (
                    setConsiderations({
                        ...considerations,
                        count: considerations.count+1,
                    })
                )}></AddButton>
            </Stack>
            <DynamicList onAddItem={considerations.count} onChange={handleConsiderations}></DynamicList>
        </Box>

        <Box display="flex" justifyContent="center">
            <Button variant="contained" type="submit">Generate</Button>
        </Box>
      </form>
    </Box>
  );
};

export default CustomizeCourse;
