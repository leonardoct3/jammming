import React, { useState, useEffect} from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import Playlist from './components/Playlist/Playlist';
import './App.css';
import Spotify from './utils/Spotify';
import toast from 'react-hot-toast';
import Loading from './components/Loading/Loading';

function App() {

  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [uris, setUris] = useState([]);

  const handleSearch = async (searchTerm) => {
    const results = await Spotify.search(searchTerm);
    setSearchResults(results);
    console.log(results);
  }

  const addToPlaylist = (track) => {
    setSearchResults(searchResults.filter(t => t.id !== track.id));
    setPlaylist([...playlist, track]);
    setUris([...uris, track.uri]);
    setLoading(true);
  }

  const removeFromPlaylist = (track) => {
    setPlaylist(playlist.filter(t => t.id !== track.id));
    setSearchResults([...searchResults, track]);
  }

  const handleSavePlaylist = async (playlistName, uris) => {
    await Spotify.savePlaylist(playlistName, uris);
    console.log(playlistName + uris);
    setPlaylist([]);
    setPlaylistName('New Playlist');
    toast.success('Playlist saved!');
  }
  
  useEffect(() => {
    Spotify.getAccessToken();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
      </header>
      <h1 className='slogan'>The one and only <span className='highlight'>Spotify Web Helper</span>.<br/>Try it out! </h1>
      <SearchBar setSearchResults={setSearchResults} search={handleSearch}/>
      <div className='row'>
      <SearchResults tracks={searchResults} action={addToPlaylist} />
      <Playlist 
        name={playlistName}
        savePlaylist={handleSavePlaylist} 
        setPlaylistName={setPlaylistName}
        tracks={playlist} 
        action={removeFromPlaylist}
        uris={uris}
      />
      </div>
      <Loading status={loading} />
    </div>
  );
}

export default App;
