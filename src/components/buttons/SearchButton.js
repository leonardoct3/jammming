import React from 'react';
import './SearchButton.css';

function SearchButton( { search, term } ) {
  return (
    <button onClick={() => search(term)} className="SearchButton">Search</button>
  );
}

export default SearchButton;
