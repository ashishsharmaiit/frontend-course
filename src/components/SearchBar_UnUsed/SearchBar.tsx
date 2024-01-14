// SearchBar.js
import React, { useState } from 'react'; // Import useState here
import './SearchBar.css'; // Import the CSS for styling

interface SearchBarProps {
    onSearch: (searchTerm: string) => void; // Define the type for the onSearch prop
  }
  
function SearchBar({ onSearch }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm); // Call the onSearch prop with the current input value
    };
    
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." onChange={handleInputChange} />
            <button onClick={handleSearch}>
                <i className="search-icon">🔍</i> {/* Using emoji as an icon for simplicity */}
            </button>
        </div>
    );
}

export default SearchBar;
