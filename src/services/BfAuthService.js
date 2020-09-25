import Cookies from 'js-cookie';

import { BfAuthSpotifyService } from './BfAuthSpotifyService';

const SPOTIFY_AUTH_TOKEN_COOKIE_KEY = 'spotify-token';
let SPOTIFY_AUTH_TOKEN = null;

export class BfAuthService {
    constructor() {
        this.authService = new BfAuthSpotifyService();

        this.authed = false;
    }

    /* STATIC METHODS */
    
    static get spotifyAuthTokenCookieKey() {
        return SPOTIFY_AUTH_TOKEN_COOKIE_KEY;
    }

    static get spotifyAuthToken() {
        if (!SPOTIFY_AUTH_TOKEN) {
            SPOTIFY_AUTH_TOKEN = Cookies.get(SPOTIFY_AUTH_TOKEN_COOKIE_KEY);
        }

        return SPOTIFY_AUTH_TOKEN;
    }

    static logOut() {
        this.removeSpotifyAuthToken();
    }

    static removeSpotifyAuthToken() {
        this.removeSpotifyAuthTokenCookie();
        SPOTIFY_AUTH_TOKEN = null;
    }

    static removeSpotifyAuthTokenCookie() {
        Cookies.remove(this.spotifyAuthTokenCookieKey);
    }

    /* Instance methods */

    isAuthed() {
        return !!this.authed;
    }

    authorize() {
        return this.authService.authorize();
    }
}