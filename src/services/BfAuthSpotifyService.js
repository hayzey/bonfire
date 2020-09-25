const clientId = process.env.BONFIRE_SPOTIFY_CLIENT_ID;

export class BfAuthSpotifyService {
    constructor() {
        this.clientId = clientId;

        this.authEndpoint = 'https://accounts.spotify.com/authorize';
        this.authSuccessRedirectUrl = `${window.location.origin}/spotify-auth-success/`;
        this.authScopes = [
            'streaming',
            'user-read-email',
            'user-read-private',
            'user-read-playback-state',
        ];
        
        this.authScopesString = this.authScopes.join(' ');
    }

    generateAuthUrl() {
        let url = this.authEndpoint;
        url += `?client_id=${this.clientId}`;
        url += `&redirect_uri=${encodeURIComponent(this.authSuccessRedirectUrl)}`;
        url += `&scope=${encodeURIComponent(this.authScopesString)}`;
        url += '&response_type=token';

        return url;
    }

    authorize() {
        this.goToAuthPage();
    }

    goToAuthPage() {
        let url = this.generateAuthUrl();
        window.location.href = url;
    }
}