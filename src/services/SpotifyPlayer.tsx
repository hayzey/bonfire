import axios from 'axios';
import { Resource } from './Resource';
import { SpotifyApi } from './SpotifyApi';
import { Track } from './SpotifyTrack';

export interface Player {
    name: string;
    getOAuthToken: (cb: (token: string) => {}) => {}
}

export interface Spotify {
    Player: Player;
}

export interface PlaybackStateTrackWindow {
    current_track: Track;
}

export interface PlaybackState {
    track_window: PlaybackStateTrackWindow;
    paused: boolean;
    position: number;
}

export class SpotifyPlayer extends Resource {
    static url = `${SpotifyApi.spotifyApiUrl}me/player`;
    static playTrackUrl = `${SpotifyApi.spotifyApiUrl}me/player/play`;

    static playTracks(trackUris: string[] = []) {
        let requestBody = {
            uris: trackUris
        };
        
        return axios.put(this.playTrackUrl, requestBody);
    }
}