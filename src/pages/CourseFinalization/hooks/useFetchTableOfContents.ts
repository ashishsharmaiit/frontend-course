const useFetchTableOfContents = () => {
  const fetchTableOfContents = async (book: { title: string; description: string }, userInterest: string) => {
    const response = await fetch('http://localhost:5000/api/table_of_contents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: book.title,
        description: book.description,
        userInterest: userInterest, // Add userInterest to the request body
      }),
    });
    return await response.json();
  };

  return fetchTableOfContents;
};

export default useFetchTableOfContents;
