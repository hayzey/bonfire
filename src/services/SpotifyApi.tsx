import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AuthService } from './AuthService';

interface AuthRequestSuccessConfigHeaders {
    'Authorization'?: string;
    'Content-Type'?: string;
}

type AuthRequestSuccessConfig = AxiosRequestConfig & {
    url: string;
    headers: AuthRequestSuccessConfigHeaders;
}

export class SpotifyApi {
    static spotifyApiUrl = 'https://api.spotify.com/v1/';

    static init() {
        this.configHttpInterceptors();
    }

    static configHttpInterceptors() {
        axios.interceptors.request.use(
            // @ts-ignore
            this.authRequestSuccessInterceptor.bind(this)
        );

        // let requestInterceptor = (config: AxiosRequestConfig) => SpotifyApi.authRequestSuccessInterceptor(config);
        // axios.interceptors.request.use(requestInterceptor);
        
        axios.interceptors.response.use(
            this.authResponseSuccessInterceptor.bind(this),
            this.authResponseErrorInterceptor.bind(this)
        );
    }

    // Adds the appropriate headers to any Spotify API requests
    static authRequestSuccessInterceptor(config: AuthRequestSuccessConfig) {
        if (config?.url?.includes(this.spotifyApiUrl)) {
            const token = AuthService.getSpotifyAuthToken();
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    }
    
    // Handles success responses.
    static authResponseSuccessInterceptor(config: AxiosResponse) {
        return config;
    }

    // Handles error responses from the Spotify API, including logging the user
    // out if there is a 401 response (user's auth session is invalid).
    static authResponseErrorInterceptor(error: AxiosError) {
        if (
            error?.response?.config?.url?.includes(this.spotifyApiUrl) &&
            error?.response?.status === 401
        ) {
            AuthService.logOut();
        }

        return Promise.reject(error);
    }

}