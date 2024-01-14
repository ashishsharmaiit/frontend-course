  // ResultsPage.tsx
  // code for the showing results of books based on user's inputs and the Modal for expanded view for a book

  
  import React, { useState } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
  import Logo from '../../components/Logo/Logo';
  import useFetchTableOfContents from './hooks/useFetchTableOfContents';
  import useFetchCourse from '../../hooks/useFetchCourse';
  import useIncreaseScrollLength from '../../hooks/useIncreaseScrollLength';
  import BookCardList from './components/BookCardList/BookCardList';
  import BookDetailsModal from './components/BookDetailsModal/BookDetailsModal';
  import config from '../../config'; // adjust the path as per your directory structure

  interface Book {
    title: string;
    description: string;
    tableOfContents?: { chapter_number: string; chapter_name: string }[];
  }
  

  const CourseFinalization = () => {
    const navigate = useNavigate();
    const location = useLocation();  
    const initialBookList = location.state?.data.books || [];  //array is for the list of books initially received
    const [bookList, setBookList] = useState<Book[]>(initialBookList); //array for the list of books updated
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);  //array for selected specific book - used for Modal
    const [isFetchingMoreBooks, setIsFetchingMoreBooks] = useState(false); //variable used to denote that more books are currently being fetched so that multiple calls are avoided to maintain infinite scrolling and the message of "loading more books" could be displayed
    const fetchBookList = useFetchCourse();
    const fetchTableOfContents = useFetchTableOfContents();
    const [isLoadingTableOfContents, setIsLoadingTableOfContents] = useState(false);
    const textBoxValue = location.state?.textBoxValue || [];


    //function to fetch additional books
    const handleFetchMoreBooks = async () => {
      setIsFetchingMoreBooks(true);
      try {
        const moreBooksForBookList = await fetchBookList();
        if (moreBooksForBookList && moreBooksForBookList.books) {
          setBookList((prevBookList) => [...prevBookList, ...moreBooksForBookList.books]);
        }
      } catch (error) {
        console.error('Error fetching more books:', error);
      } finally {
        setIsFetchingMoreBooks(false);
      }
    };
    
    if (config.infiniteResultsMode) {
      useIncreaseScrollLength(handleFetchMoreBooks, isFetchingMoreBooks);
    }

    const handleCardClick = async (book: Book) => {
      setSelectedBook(book);
    };
  
    
    const handleCloseModal = () => {
      setSelectedBook(null);
    };

    const handleReadNowClick = async () => {
      if (selectedBook) {
        setIsLoadingTableOfContents(true); // Start loading
        try {
          const tableOfContents = await fetchTableOfContents(selectedBook, textBoxValue);
          navigate('/book-view', { state: { book: { ...selectedBook, tableOfContents } } });
        } catch (error) {
          console.error('Error fetching table of contents:', error);
          // Handle error
        } finally {
          setIsLoadingTableOfContents(false); // Stop loading
        }
      }
    };
  
      

    return (
      <React.StrictMode>
        <Logo />
        <BookCardList books={bookList} onBookClick={handleCardClick} />
        <BookDetailsModal
        selectedBook={selectedBook}
        onClose={handleCloseModal}
        onReadNowClick={handleReadNowClick}
        isLoading={isLoadingTableOfContents}
      />
      {isFetchingMoreBooks && <p>Loading more books...</p>}
      </React.StrictMode>
    );
  };
  


  export default CourseFinalization;
