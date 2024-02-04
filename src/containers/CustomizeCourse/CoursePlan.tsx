import { useNavigate } from "react-router-dom";
import { 
    Typography, 
    Box, 
    Button
} from '@mui/material';
import BouncingDotsLoader from '../../components/BouncingDotsLoader/BouncingDotsLoader';

function CoursePlan({ plan, isCourseLoading } : {plan: string | null, isCourseLoading: boolean}) {
    const navigate = useNavigate();

    const handleSubmit = async () => {
        navigate("/lesson");
    };

    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: 1008, 
            bgcolor: '#D9D9D9',
            borderRadius: "40px",
            p: 2 }}>
          <Typography gutterBottom component="div" align="center" sx={{
            color: "#000",
            fontSize: "32px",
            fontWeight: "800",
          }}>
            Course Plan
          </Typography>
          {isCourseLoading 
            ? (<Box alignItems="center">
                <Typography gutterBottom component="div" align="center" sx={{
                    color: "#000",
                    fontSize: "32px",
                    fontWeight: "200",
                    paddingTop: "80px",
                    paddingBottom: "8px",
                }}>
                    Generating
                </Typography>
                <BouncingDotsLoader />
              </Box>)
            :  (<>
                {plan && (
                    <>
                        <Typography gutterBottom component="div" sx={{
                            color: "#000",
                            fontSize: "16px",
                            fontWeight: "400",
                            lineHeight: "24px"
                        }}>
                            {plan}
                        </Typography>
                        <Box alignItems="center">
                            <Button 
                                variant="contained" 
                                onClick={() => {
                                    console.log('Clicked');
                                    handleSubmit();
                                }}>
                                    Start Course
                            </Button>
                        </Box>
                    </>
                )}
                {!plan && (
                    <Box alignItems="center">
                        <Typography variant="subtitle1" gutterBottom component="div" align="center" sx={{paddingTop: "80px"}}>
                            No plan generated
                        </Typography>
                    </Box>
                )}
            </>)}
        </Box>
    );
};

export default CoursePlan;