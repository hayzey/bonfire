import axios from 'axios';
import { Resource } from './Resource';
import { BfSpotifyApi } from './BfSpotifyApi';

export class BfSpotifyPlayer extends Resource {
    static url = `${BfSpotifyApi.spotifyApiUrl}me/player`;
    static playTrackUrl = `${BfSpotifyApi.spotifyApiUrl}me/player/play`;

    static playTracks(trackUris = []) {
        let requestBody = {
            uris: trackUris
        };
        
        return axios.put(this.playTrackUrl, requestBody);
    }
}