export class BfPlayerSpotifyService {
    constructor() {
        this.playerName = 'Bonfire Player';

        this.spotifyPlayer = null;
        this.ready = false;
        this.playing = false;
    }

    initListeners() {
        // Error handling
        this.spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });
      
        this.spotifyPlayer.addListener('ready', ({ device_id }) => {
            this.ready = true;
        });
      
        this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            this.ready = false;
        });

        this.spotifyPlayer.addListener('player_state_changed', (state) => {
            console.info('Player state changed', state);

            if (state && !state.paused) { // Already playing
                this.playing = true;
            } else {
                this.playing = false;
            }
        });
    }

    init() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const Spotify = window.Spotify;
          
            const token = 'foo';

            
            this.spotifyPlayer = new Spotify.Player({
              name: this.playerName,
              getOAuthToken: cb => { cb(token); }
            });
          
            // Connect to the player
            this.spotifyPlayer.connect();
          };
    }

    play() {
        this.playing = true;
        return this.spotifyPlayer.play();
    }

    pause() {
        this.playing = false;
        return this.spotifyPlayer.pause();
    }
}