import React from 'react';
import Text from '../../../../components/Text/Text';
import './TableOfContent.css'

type TableOfContentHeaderProps = {
    tableOfContents: { chapter_name: string }[];
  };
  
const TableOfContent: React.FC<TableOfContentHeaderProps> = ({ tableOfContents }) => {
  return (
    <div className="table-of-content">
        <Text tag="h2" text="Table of Contents" textAlign="center" />
        {tableOfContents && tableOfContents.map((chapter, index) => (
            <div key={index}>
                <Text tag="p" text={`Chapter ${index + 1}: ${chapter.chapter_name}`} />
            </div>
        ))}
    </div>
  );
};

export default TableOfContent;
