import React, { useState, ChangeEvent } from "react";


interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search for a movie here!"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
