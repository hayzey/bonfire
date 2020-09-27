import axios from 'axios';
import { Resource } from './Resource';
import { BfSpotifyApi } from './BfSpotifyApi';

export class BfSpotifyTrack extends Resource {
    static url = `${BfSpotifyApi.spotifyApiUrl}tracks/:id`;
    static userTracksUrl = `${BfSpotifyApi.spotifyApiUrl}me/tracks`;

    static queryUserTracks(params = {}) {
        return axios.get(
            this.resolveUrlWithParams(this.userTracksUrl, params)
        );
    }
}