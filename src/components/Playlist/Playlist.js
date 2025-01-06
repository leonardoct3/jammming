import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';
import SaveToSpotifyButton from '../buttons/SaveToSpotifyButton';

function Playlist({ tracks, action, setPlaylistName, savePlaylist, name, uris}) {

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  }

  return (
    <div className="Playlist">
      <h1>Create Pla<span className="highlight">yyy</span>list</h1>
      <input type="text" onChange={handleNameChange} value={name} />
      <Tracklist onPlaylist={true} tracks={tracks} action={action} />
      <SaveToSpotifyButton savePlaylist={savePlaylist} name={name} uris={uris} />
    </div>
  );
}

export default Playlist;
