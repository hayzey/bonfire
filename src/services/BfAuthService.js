import { BfAuthSpotifyService } from './BfAuthSpotifyService';

export class BfAuthService {
    constructor() {
        this.authService = new BfAuthSpotifyService();

        this.authed = false;
    }

    isAuthed() {
        return !!this.authed;
    }

    authorize() {
        return this.authService.authorize();
    }
}