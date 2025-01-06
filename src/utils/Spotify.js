const clientId = '68c965604dac4a5c88ef8f26ff9a3316';
const redirectUri = 'http://localhost:3000/';
let accessToken;
let expiresIn;


const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        // Check for access token match in URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            expiresIn = Number(expiresInMatch[1]);

            // Clear the parameters from the URL
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/search?type=track&q=${term}&limit=10`;
        try {
            const response = await fetch(urlToFetch, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const jsonResponse = await response.json();
            if (!jsonResponse.tracks) {
                return [];
            }

            const listings = jsonResponse.tracks.items
            .map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }));

            return listings;
        } catch (error) {
            console.log(error);
        }

    },
    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
          return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        try {
          const userResponse = await fetch('https://api.spotify.com/v1/me', { headers: headers });
          const userData = await userResponse.json();
          userId = userData.id;
    
          const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ name: name })
          });
          const playlistData = await createPlaylistResponse.json();
          const playlistId = playlistData.id;
    
          await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({ uris: trackUris })
          });
          console.log('WORKED');
        } catch (error) {
          console.log(error);
        }
    },
    async playSample(trackUri) {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/me/player/play`;
        try {
            const response = await fetch(urlToFetch, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    uris: [trackUri]
                })
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } catch (error) {
            console.log(error);
        }
    },
    async playbackState() {
        const accessToken = Spotify.getAccessToken();
        const urlToFetch = `https://api.spotify.com/v1/me/player`;
        try {
            const response = await fetch(urlToFetch, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } catch (error) {
            console.log(error);
        }
    }
};

export default Spotify;
