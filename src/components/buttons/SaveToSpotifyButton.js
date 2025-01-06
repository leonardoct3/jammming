import React from 'react';
import './SaveToSpotifyButton.css';

function SaveToSpotifyButton({ savePlaylist, uris, name}) {
  return (
    <button onClick={() => savePlaylist(name, uris)} className="SaveToSpotifyButton">Save to Spotify</button>
  );
}

export default SaveToSpotifyButton;
