import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.css';

function SearchResults({ tracks, action }) {
  return (
    <div className="SearchResults">
      <h1>Results</h1>
      {tracks.length > 0 ? (
        <Tracklist onPlaylist={false} action={action} tracks={tracks} />
      ) : (
        <h3 className="no-results">Try searching for a song, album, or artist!</h3>
      )}
    </div>
  );
}

export default SearchResults;
