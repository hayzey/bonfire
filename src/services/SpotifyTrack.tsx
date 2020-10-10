import axios from 'axios';
import { Resource } from './Resource';
import { SpotifyApi } from './SpotifyApi';
import { Album } from './SpotifyAlbum';
import { Artist } from './SpotifyArtist';

export interface MetaTrack {
    added_at?: string;
    track: Track;
}

export interface Track {
    id: string;
    uri: string;
    name: string;
    album: Album;
    artists: Artist[];
}

export class SpotifyTrack extends Resource {
    static url = `${SpotifyApi.spotifyApiUrl}tracks/:id`;
    static userTracksUrl = `${SpotifyApi.spotifyApiUrl}me/tracks`;

    static queryUserTracks(params = {}) {
        return axios.get(
            this.resolveUrlWithParams(this.userTracksUrl, params)
        );
    }
}