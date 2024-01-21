import CustomizeCourse from "../../containers/CustomizeCourse/CustomizeCourse";
import CoursePlan from "../../containers/CustomizeCourse/CoursePlan";
import { 
    Stack } from '@mui/material';
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux"
import { CourseOptions } from "../../models/CourseOptions/CourseOptions";
import { generateCoursePlan } from "../../actions/CourseActions";

const CoursePage = () => {
    const dispatch = useDispatch()

    const { coursePlan, isCourseLoading } = useAppSelector(state => state.courseReducer)

    const handleSubmit = async (courseOptions: CourseOptions) => {
        await dispatch(
            generateCoursePlan(
                courseOptions
            )
        );
    };
    
    return (
        <Stack direction="row" spacing={2}>
            <CustomizeCourse handleSubmit={handleSubmit} />
            <CoursePlan plan={coursePlan} isCourseLoading={isCourseLoading}/>
        </Stack>
    );
}

export default CoursePage;