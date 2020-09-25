import axios from 'axios';
import { BfSpotifyApi } from './BfSpotifyApi';
import { BfAuthService } from './BfAuthService';

export class BfSpotifyDevice {
    constructor() {}

    static get deviceListUrl() {
        return `${BfSpotifyApi.spotifyApiUrl}player/devices`;
    };
    
    static query() {
        return axios.get(this.deviceListUrl)
            .then((data) => {
                console.info('Synced Devices', data);
            });
    }
}