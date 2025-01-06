import React from 'react';
import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist({ tracks = [], action, onPlaylist }) {
  return (
    <div className="Tracklist">
      {tracks ? (
        tracks.map(track => (
          <Track onPlaylist={onPlaylist} action={action} key={track.id} track={track} />
        ))
      ) : (
        onPlaylist ? null : <p>Search a Jam!</p>
      )}
    </div>
  );
}

export default Tracklist;
