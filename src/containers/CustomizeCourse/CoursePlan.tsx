import { 
    Typography, 
    Box, 
    Button
} from '@mui/material';
import BouncingDotsLoader from '../../components/BouncingDotsLoader/BouncingDotsLoader';

function CoursePlan({ plan, isCourseLoading } : {plan: string | null, isCourseLoading: boolean}) {
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Course Plan
          </Typography>
          {isCourseLoading 
            ? (<>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Generating
                </Typography>
                <BouncingDotsLoader />
              </>)
            :  (<>
                {plan && (
                    <>
                        <Typography variant="body1" gutterBottom component="div">
                            {plan}
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => {
                                console.log('Clicked')
                            }}>
                                Start Course
                        </Button>
                    </>
                )}
                {!plan && (
                    <>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            No plan generated yet
                        </Typography>
                    </>
                )}
            </>)}
        </Box>
    );
};

export default CoursePlan;