const clientId = process.env.BONFIRE_SPOTIFY_CLIENT_ID;

export class BfAuthSpotifyService {
    constructor() {
        this.clientId = clientId;

        this.authEndpoint = 'https://accounts.spotify.com/authorize';
        this.authSuccessRedirectUrl = 'http://localhost:3000/spotify-auth-success/'; // TODO: Use dynamic domain
    }

    generateAuthUrl() {
        let url = this.authEndpoint;
        url += `?client_id=${this.clientId}`;
        url += `&redirect_uri=${this.authSuccessRedirectUrl}`;
        url += '&response_type=token';

        return url;
    }

    authorize() {
        let url = this.generateAuthUrl();
        window.location.href = url;
    }
}