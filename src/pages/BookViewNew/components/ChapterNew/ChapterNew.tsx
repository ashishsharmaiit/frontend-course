import React from 'react';
import Text from '../../../../components/Text/Text';

type TableOfContentHeaderProps = {
    tableOfContents: { chapter_name: string }[];
    chapterContents: string[];
    bookTitle: string;
};

const ChapterNew: React.FC<TableOfContentHeaderProps> = ({ tableOfContents, chapterContents }) => {
    const renderChapters = () => {
        return chapterContents.map((content, index) => {
            const chapter = tableOfContents[index];
            if (!chapter) {
                console.log("Chapter missing for index:", index); // Debug log
                return <div key={index}>Chapter information not available</div>;
            }
    
            return (
                <div key={index}>
                    <Text tag="h2" text={`Chapter ${index + 1}: ${chapter.chapter_name}`} />
                    <Text tag="p" text={content} />
                </div>
            );
        });
    };

    console.log("Rendering chapters. Contents length:", chapterContents.length, "Table of contents length:", tableOfContents.length); // Debug log

    return (
        <div>
            {renderChapters()}
            {chapterContents.length === tableOfContents.length ? (
                <Text key="end-of-book" tag="h2" text="End of Book" textAlign="center"/>
            ) : (
                <Text key="loading-more" tag="p" text="Loading more content..." textAlign="center"/>
            )}
        </div>
    );
};


export default ChapterNew;
