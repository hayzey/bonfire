import { Resource } from './Resource';
import { SpotifyApi } from './SpotifyApi';

export class SpotifyDevice extends Resource {
    static url = `${SpotifyApi.spotifyApiUrl}me/playlists`;
}