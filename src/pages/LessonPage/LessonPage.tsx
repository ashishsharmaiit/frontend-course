import React, { useState, useEffect } from 'react';
import courseData from './courseData.json'; // Importing the JSON data

const DataDisplayPage: React.FC = () => {
    const [data, setData] = useState<any | null>(null); // Changed to 'any'
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
        <div>
            <div>
              <h3>Received Data:</h3>
              <pre>{JSON.stringify(data, null, 2)}</pre> {/* Adjusted for readability */}
            </div>
        </div>
    );
};

export default DataDisplayPage;
