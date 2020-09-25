import axios from 'axios';
import { BfSpotifyApi } from './BfSpotifyApi';
import { BfAuthService } from './BfAuthService';

export class BfSpotifyDevice {
    constructor() {}

    static get deviceListUrl() {
        return `${BfSpotifyApi.spotifyApiUrl}me/player/devices`;
    };

    static get playerUrl() {
        return `${BfSpotifyApi.spotifyApiUrl}me/player`;
    };
    
    static query() {
        return axios.get(this.deviceListUrl)
            .then((data) => {
                console.info('Synced Devices', data);
            });
    }

    static setAsCurrentDevice(deviceId) {
        let requestBody = {
            device_ids: [deviceId]
        };
        
        return axios.put(this.playerUrl, requestBody);
    }
}