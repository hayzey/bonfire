import axios from 'axios';
import { BfAuthService } from './BfAuthService';

export class BfSpotifyApi {
    constructor() {}

    static spotifyApiUrl = 'https://api.spotify.com/v1/';

    static init() {
        this.configHttpInterceptors();
    }

    static configHttpInterceptors() {
        axios.interceptors.request.use(
            this.authRequestSuccessInterceptor.bind(this)
        );
        
        axios.interceptors.response.use(
            this.authResponseSuccessInterceptor.bind(this),
            this.authResponseErrorInterceptor.bind(this)
        );
    }

    // Adds the appropriate headers to any Spotify API requests
    static authRequestSuccessInterceptor(config) {
        if (config.url.includes(this.spotifyApiUrl)) {
            const token = BfAuthService.getSpotifyAuthToken();
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    }
    
    // Handles success responses.
    static authResponseSuccessInterceptor(config) {
        return config;
    }

    // Handles error responses from the Spotify API, including logging the user
    // out if there is a 401 response (user's auth session is invalid).
    static authResponseErrorInterceptor(error) {
        if (
            error?.response?.config?.url.includes(this.spotifyApiUrl) &&
            error?.response?.status === 401
        ) {
            BfAuthService.logOut();
        }

        return Promise.reject(error);
    }

}