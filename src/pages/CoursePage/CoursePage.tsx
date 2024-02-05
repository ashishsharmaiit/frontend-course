import CustomizeCourse from "../../containers/CustomizeCourse/CustomizeCourse";
import CoursePlan from "../../containers/CustomizeCourse/CoursePlan";
import { 
    Box,
    Stack } from '@mui/material';
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux"
import { CourseOptions } from "../../models/CourseOptions/CourseOptions";
import { generateCoursePlan } from "../../actions/CourseActions";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";

const CoursePage = () => {
    const dispatch = useDispatch()

    const { detailedCoursePlan, courseOptions, isCourseLoading } = useAppSelector(state => state.courseReducer)
    const handleSubmit = async (courseOptions: CourseOptions) => {
        console.log({
            detailedCoursePlan,
            courseOptions,
            isCourseLoading
        });
        /*await dispatch(
            generateCoursePlan(
                courseOptions
            )
        );*/
    };
    
    return (
        <Box>
            <MenuAppBar></MenuAppBar>
            <Stack direction="row" justifyContent="center" spacing={2}>
                <CustomizeCourse initOptions={courseOptions} handleSubmit={handleSubmit} />
                <CoursePlan plan={detailedCoursePlan} isCourseLoading={isCourseLoading}/>
            </Stack>
        </Box>
    );
}

export default CoursePage;