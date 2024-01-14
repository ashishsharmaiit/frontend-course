// src/hooks/useFetchBookList.ts

const useFetchCourse = () => {
    const fetchCourse = async (textBoxValue?: string) => {
      try {
        const body = textBoxValue ? JSON.stringify({ textBoxValue }) : JSON.stringify({});
        const response = await fetch('http://192.168.0.14:5000/api/books_names', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return await response.json();
      } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow to let the calling component handle it
      }
    };
  
    return fetchCourse;
  };
  
  export default useFetchCourse;
  