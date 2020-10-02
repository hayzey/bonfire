const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

export class AuthSpotifyService {
    static clientId? : string = clientId;
    static authEndpoint : string = 'https://accounts.spotify.com/authorize';
    static authSuccessRedirectUrl : string = `${window.location.origin}/spotify-auth-success/`;
    static authScopes : string[] = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-library-read',
    ];
    
    static getAuthScopesQueryValue() : string {
        return this.authScopes.join(' ');
    }

    private static generateAuthUrl() : string {
        let url = this.authEndpoint;
        url += `?client_id=${this.clientId}`;
        url += `&redirect_uri=${encodeURIComponent(this.authSuccessRedirectUrl)}`;
        url += `&scope=${encodeURIComponent(this.getAuthScopesQueryValue())}`;
        url += '&response_type=token';

        return url;
    }

    private static goToAuthPage() : void {
        let url = this.generateAuthUrl();
        window.location.href = url;
    }

    public static authorize() : void {
        this.goToAuthPage();
    }
}