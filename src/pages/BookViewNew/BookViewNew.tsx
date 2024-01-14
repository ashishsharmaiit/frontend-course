import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookName from './components/BookName/BookName';
import TableOfContent from './components/TableOfContent/TableOfContent';
import ChapterNew from './components/ChapterNew/ChapterNew';
import './BookViewNew.css'; 
import useIncreaseScrollLength from '../../hooks/useIncreaseScrollLength';

const BookViewNew = () => {
  const location = useLocation();
  const book = location.state?.book;
  const [currentChapter, setCurrentChapter] = useState(1);
  const maxChapters = book?.tableOfContents?.table_of_contents.length || 0;
  const [isFetchingChapter, setIsFetchingChapter] = useState(false);
  const [chapterContents, setChapterContents] = useState<string[]>([]);

  const fetchChapterContent = async (chapterIndex: number) => {
    const chapterName = book.tableOfContents.table_of_contents[chapterIndex - 1].chapter_name;
    setIsFetchingChapter(true);
    const response = await fetch('http://192.168.0.14:5000/api/get_chapter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ book_title: book.title, chapter_name: chapterName }),
    });
    const data = await response.json();
    setChapterContents(prev => [...prev, data.chapter_content]);
    setIsFetchingChapter(false);
  };

  useEffect(() => {
    if (currentChapter <= maxChapters && chapterContents.length < currentChapter) {
      fetchChapterContent(currentChapter);
    }
  }, [currentChapter, maxChapters, chapterContents.length, book]);

  const increaseChapter = () => {
    if (currentChapter < maxChapters && !isFetchingChapter) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const canFetchMoreChapters = currentChapter < maxChapters && !isFetchingChapter;
  useIncreaseScrollLength(increaseChapter, canFetchMoreChapters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [book]);

  return (
    <div>
      {book && (
        <>
          <BookName title={book.title} />
          <TableOfContent tableOfContents={book.tableOfContents?.table_of_contents} />
          <ChapterNew 
            tableOfContents={book.tableOfContents?.table_of_contents}
            chapterContents={chapterContents}
            bookTitle={book.title}
          />
        </>
      )}
    </div>
  );
};

export default BookViewNew;
