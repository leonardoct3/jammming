import React from 'react';
import './Track.css';

function Track({ track, action, onPlaylist }) {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <div className='buttons'>
        <button onClick={() => action(track)} className="Track-action">{onPlaylist ? '-' : '+'}</button>
      </div>
      
    </div>
  );
}

export default Track;
