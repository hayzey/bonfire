import axios from 'axios';
import { Resource } from './Resource';
import { BfSpotifyApi } from './BfSpotifyApi';

export class BfSpotifyDevice extends Resource {
    static url = `${BfSpotifyApi.spotifyApiUrl}me/player/devices`;

    static get playerUrl() {
        return `${BfSpotifyApi.spotifyApiUrl}me/player`;
    };

    static setAsCurrentDevice(deviceId) {
        let requestBody = {
            device_ids: [deviceId]
        };
        
        return axios.put(this.playerUrl, requestBody);
    }
}