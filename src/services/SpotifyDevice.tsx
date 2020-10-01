import axios from 'axios';
import { Resource } from './Resource';
import { SpotifyApi } from './SpotifyApi';

export class SpotifyDevice extends Resource {
    static url = `${SpotifyApi.spotifyApiUrl}me/player/devices`;

    static get playerUrl() {
        return `${SpotifyApi.spotifyApiUrl}me/player`;
    };

    static setAsCurrentDevice(deviceId) {
        let requestBody = {
            device_ids: [deviceId]
        };
        
        return axios.put(this.playerUrl, requestBody);
    }
}