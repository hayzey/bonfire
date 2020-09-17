import React from 'react';
import Cookies from 'js-cookie';

import { BfPlaybackControls } from '../BfPlaybackControls/BfPlaybackControls';

export class BfMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            playing: false
        };

        this.playerName = 'Bonfire Player';
        this.spotifyPlayer = null;
        this.spotifyTokenCookieName = 'spotify-token';
        this.authToken = null;
        this.previousTrackBuffer = 3000; // The amount of time in ms until clicking "previous" will go to the previous track (other seek to start)

        this.handleTogglePlayClicked = this.handleTogglePlayClicked.bind(this);
        this.handlePreviousTrackClicked = this.handlePreviousTrackClicked.bind(this);
        this.handleNextTrackClicked = this.handleNextTrackClicked.bind(this);
    }

    initListeners() {
        // Error handling
        this.spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });

        this.spotifyPlayer.addListener('ready', ({ device_id }) => {
            this.setState({
                ready: true
            });
        });

        this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            this.setState({
                ready: false
            });
        });

        this.spotifyPlayer.addListener('player_state_changed', (state) => {
            console.info('Player state changed', state);

            if (state && !state.paused) { // Already playing
                this.setState({
                    playing: true
                });
            } else {
                this.setState({
                    playing: false
                });
            }
        });
    }

    init() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const Spotify = window.Spotify;

            this.spotifyPlayer = new Spotify.Player({
                name: this.playerName,
                getOAuthToken: (cb) => {
                    cb(this.getAuthToken());
                }
            });

            // Connect to the player
            this.spotifyPlayer.connect();
            this.initListeners();
        };
    }

    getAuthToken() {
        if (!this.authToken) {
            this.authToken = Cookies.get(this.spotifyTokenCookieName);
        }

        return this.authToken;
    }

    getCurrentState() {
        return this.spotifyPlayer.getCurrentState();
    }

    play() {
        this.setState({
            playing: true
        });

        return this.spotifyPlayer.play();
    }

    pause() {
        this.setState({
            playing: false
        });

        return this.spotifyPlayer.pause();
    }

    togglePlay() {
        this.setState({
            playing: !this.state.playing
        });
        
        return this.spotifyPlayer.togglePlay();
    }

    previousTrack() {
        return this.getCurrentState()
            .then((state) => {
                if (state && state.position < this.previousTrackBuffer) {
                    return this.spotifyPlayer.previousTrack();
                } else {
                    this.spotifyPlayer.seek(0);
                }
            })
    }

    nextTrack() {
        return this.spotifyPlayer.nextTrack();
    }

    handleTogglePlayClicked() {
        this.togglePlay();
    }

    handlePreviousTrackClicked() {
        this.previousTrack();
    }

    handleNextTrackClicked() {
        this.nextTrack();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <main className="main">
                <BfPlaybackControls
                    player={this.player}
                    ready={this.state.ready}
                    playing={this.state.playing}
                    onTogglePlayClicked={ this.handleTogglePlayClicked }
                    onPreviousTrackClicked={ this.handlePreviousTrackClicked }
                    onNextTrackClicked={ this.handleNextTrackClicked } />
            </main>
        );
    }
}