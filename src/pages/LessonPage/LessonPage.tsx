import React, { useState, useEffect } from 'react';
import courseData from './courseData.json';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Import Box component for additional styling flexibility
import Button from '@mui/material/Button'; // Import Button component


const DataDisplayPage: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        console.log('Sending request with data:', courseData); // Log the data being sent
        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData), // Sending the JSON data
        })
        .then(response => {
            console.log('Response received:', response); // Log the response object

            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then((receivedData) => { // Removed type annotation
            console.log('Data parsed from response:', receivedData); // Log the parsed data

            setData(receivedData); // Use the received data directly
            setIsLoading(false);
        })
        .catch((error: Error) => {
            console.error('Error caught:', error); // Log any errors caught

            setError(error.message);
            setIsLoading(false);
        });
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    return (
        <Container maxWidth="md" style={{ paddingTop: '100px', paddingBottom: '50px' }}> {/* Adjusted styles for overall padding */}
            <Box textAlign="center" paddingBottom="50px"> {/* Center "Welcome!" and add bottom padding */}
                <Typography variant="h3" component="h3" gutterBottom>
                    Welcome!
                </Typography>
            </Box>
            {data && <Typography style={{ whiteSpace: 'pre-wrap' }}>{data.welcome_content}</Typography>}
            {/* Add a "Continue" button */}
            <Box textAlign="right" paddingTop="50px"> {/* Center the button and add padding above */}
                <Button variant="contained" color="primary">
                    Continue
                </Button>
            </Box>
        </Container>
    );
};

export default DataDisplayPage;
