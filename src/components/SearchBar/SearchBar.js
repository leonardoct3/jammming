import React, { useState } from 'react';
import './SearchBar.css';
import SearchButton from '../buttons/SearchButton';

function SearchBar({ setSearchResults, search }) {

  const [searchTerm, setSearchTerm] = useState('');
  
  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="SearchBar">
      <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
      <SearchButton search={search} term={searchTerm} />
    </div>
  );
}

export default SearchBar;
