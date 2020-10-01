const clientId = process.env.BONFIRE_SPOTIFY_CLIENT_ID;

export class AuthSpotifyService {
    static clientId = clientId;

    static authEndpoint = 'https://accounts.spotify.com/authorize';
    static authSuccessRedirectUrl = `${window.location.origin}/spotify-auth-success/`;
    static authScopes = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-library-read',
    ];
    
    static authScopesString = this.authScopes.join(' ');

    static generateAuthUrl() {
        let url = this.authEndpoint;
        url += `?client_id=${this.clientId}`;
        url += `&redirect_uri=${encodeURIComponent(this.authSuccessRedirectUrl)}`;
        url += `&scope=${encodeURIComponent(this.authScopesString)}`;
        url += '&response_type=token';

        return url;
    }

    static authorize() {
        this.goToAuthPage();
    }

    static goToAuthPage() {
        let url = this.generateAuthUrl();
        window.location.href = url;
    }
}