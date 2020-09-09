import { BfPlayerSpotifyService } from './BfPlayerSpotifyService';

export class BfPlayerService {
    constructor() {
        this.player = new BfPlayerSpotifyService();
    }

    init() {
        this.player.init();
    }

    play() {
        return this.player.play();
    }

    pause() {
        return this.player.pause();
    }
}