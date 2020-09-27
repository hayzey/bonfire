import Cookies from 'js-cookie';

import { BfAuthSpotifyService } from './BfAuthSpotifyService';

const SPOTIFY_AUTH_TOKEN_COOKIE_KEY = 'spotify-token';
let SPOTIFY_AUTH_TOKEN = null;

export class BfAuthService {
    static onAuthChangedWatchers = [];
    
    static get spotifyAuthTokenCookieKey() {
        return SPOTIFY_AUTH_TOKEN_COOKIE_KEY;
    }

    static getSpotifyAuthToken() {
        if (!SPOTIFY_AUTH_TOKEN) {
            SPOTIFY_AUTH_TOKEN = Cookies.get(SPOTIFY_AUTH_TOKEN_COOKIE_KEY);
            this.updateAuthedStatus();
        }

        return SPOTIFY_AUTH_TOKEN;
    }

    static setSpotifyAuthToken(authToken) {
        SPOTIFY_AUTH_TOKEN = authToken;
        Cookies.set(this.spotifyAuthTokenCookieKey, authToken);
        this.updateAuthedStatus();
    }

    static removeSpotifyAuthToken() {
        SPOTIFY_AUTH_TOKEN = null;
        Cookies.remove(this.spotifyAuthTokenCookieKey);
        this.updateAuthedStatus();
    }

    static isAuthed() {
        return !!SPOTIFY_AUTH_TOKEN;
    }

    static authorize() {
        return BfAuthSpotifyService.authorize();
    }

    static logOut() {
        this.removeSpotifyAuthToken();
    }

    static onAuthChanged(callback) {
        this.onAuthChangedWatchers.push(callback);

        
        let destroyer = () => {
            let index = this.onAuthChangedWatchers.indexOf(callback);
            this.onAuthChangedWatchers.splice(index, 1);
        };

        return destroyer;
    }

    static callOnAuthChangedWatchers() {
        for (let callback of this.onAuthChangedWatchers) {
            callback(this.isAuthed());
        }
    }

    static updateAuthedStatus() {
        this.callOnAuthChangedWatchers();
    }
}