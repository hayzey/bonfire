import { Resource } from './Resource';
import { BfSpotifyApi } from './BfSpotifyApi';

export class BfSpotifyDevice extends Resource {
    static url = `${BfSpotifyApi.spotifyApiUrl}me/playlists`;
}