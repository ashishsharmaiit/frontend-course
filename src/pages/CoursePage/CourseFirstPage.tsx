import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Typography,
    TextField,
    IconButton,
    Stack,
    alpha
} from '@mui/material';
import { useDispatch } from "react-redux"
import SearchIcon from "@mui/icons-material/Search";
import { CourseFirstOptions } from "../../models/CourseOptions/CourseOptions";
import { generateFirstCoursePlan } from "../../actions/CourseActions";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";


const SearchBar = ({setSearchQuery} : {setSearchQuery: (courseOptions: CourseFirstOptions) => void}) => {
    const [topic, setTopic] = React.useState('');

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSearchQuery({ topic: topic });
        }

    return <form onSubmit={handleFormSubmit}>
        <TextField
        id="search-bar"
        variant="outlined"
        className="text"
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTopic(e.target.value);
        }}
        label="I want to learn about"
        InputProps={{ 
            style: {
                borderRadius: "25px",
            },
            endAdornment:  
                <IconButton edge="end" type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
        }}
        SelectProps={{ native: true }}
        placeholder="Generate..."
        sx={{
            width: "850px",
            bgcolor: "#FFF",
            borderRadius: "40px",
            paddingLeft: "2px",
            paddingRight: "2px"
        }}
        />
    </form>
};

const CourseFirstPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleSubmit = async (courseFirstOptions: CourseFirstOptions) => {
        await dispatch(
            generateFirstCoursePlan(
                courseFirstOptions
            )
        );
        navigate("/welcome");
    };
    
    return (
        <Box>
            <MenuAppBar></MenuAppBar>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Stack direction="column" justifyContent="center" spacing={5}>
                    <Box sx={{ 
                        width: '100%', 
                        maxWidth: 910, 
                        bgcolor: alpha('#D9D9D9', 0.67),
                        borderRadius: "20px"}}>
                        <Typography gutterBottom component="div" align="center" sx={{
                                color: "#000",
                                fontSize: "42px",
                                fontWeight: "400",
                            }}>
                            Learn what you want, the way you want
                        </Typography>
                    </Box>
                    <SearchBar setSearchQuery={handleSubmit}></SearchBar>
                </Stack>
            </Box>
        </Box>
    );
}

export default CourseFirstPage;