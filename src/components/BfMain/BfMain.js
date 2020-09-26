import React from 'react';

import { BfAuthService } from '../../services/BfAuthService';
import { BfSpotifyApi } from '../../services/BfSpotifyApi';
import { BfSpotifyDevice } from '../../services/BfSpotifyDevice';

import { BfPlaybackControls } from '../BfPlaybackControls/BfPlaybackControls';

import './BfMain.scss';

BfSpotifyApi.init();

export class BfMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            playing: false,
            playbackState: null,
            position: 0,
        };

        this.playerName = 'Bonfire Player';
        this.spotifyPlayer = null;
        this.previousTrackBuffer = 3000; // The amount of time in ms until clicking "previous" will go to the previous track (other seek to start)
        this.updatePositionIntervalDelayMs = 100;
        this.updatePositionInterval = null;

        this.handleTogglePlayClicked = this.handleTogglePlayClicked.bind(this);
        this.handlePreviousTrackClicked = this.handlePreviousTrackClicked.bind(this);
        this.handleNextTrackClicked = this.handleNextTrackClicked.bind(this);
        this.handleSeek = this.handleSeek.bind(this);
    }

    init() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const Spotify = window.Spotify;

            this.spotifyPlayer = new Spotify.Player({
                name: this.playerName,
                getOAuthToken: (cb) => {
                    let token = BfAuthService.spotifyAuthToken;
                    cb(token);
                }
            });

            // Connect to the player
            this.spotifyPlayer.connect()
                .then(success => {
                    if (success) {
                        console.info('The Web Playback SDK successfully connected to Spotify!', this.spotifyPlayer);
                    }
                });

            this.initListeners();
            this.startUpdatePositionInterval();
        };
    }

    initListeners() {
        // Error handling
        this.spotifyPlayer.addListener('initialization_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('authentication_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('account_error', ({ message }) => { console.error(message); });
        this.spotifyPlayer.addListener('playback_error', ({ message }) => { console.error(message); });

        this.spotifyPlayer.addListener('ready', ({ device_id }) => {
            BfSpotifyDevice.setAsCurrentDevice(device_id);

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
                    playbackState: state,
                    playing: !state.paused,
                    position: state.position,
                });
            }
        });
    }

    startUpdatePositionInterval() {
        this.cancelUpdatePositionInterval();
        
        this.updatePositionInterval = setInterval(
            this.updatePosition.bind(this),
            this.updatePositionIntervalDelayMs
        );
    }

    cancelUpdatePositionInterval() {
        if (this.updatePositionInterval) {
            clearInterval(this.updatePositionInterval);
            this.updatePositionInterval = null;
        }
    }

    updatePosition() {
        this.spotifyPlayer.getCurrentState()
            .then((currentState) => {
                let position = 0;
        
                if (currentState) {
                    position = currentState.position;
                }

                this.setState({
                    position: position
                });
            });
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

    seek(newPosition) {
        this.spotifyPlayer.seek(newPosition);
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

    handleSeek(newPosition) {
        this.seek(newPosition);
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
        this.cancelUpdatePositionInterval();
    }

    render() {
        return (
            <div className="bf-main bf-authed">
                <div></div>
                <BfPlaybackControls
                    player={this.player}
                    playbackState={this.state.playbackState}
                    ready={this.state.ready}
                    playing={this.state.playing}
                    position={this.state.position}
                    onTogglePlayClicked={this.handleTogglePlayClicked}
                    onPreviousTrackClicked={this.handlePreviousTrackClicked}
                    onNextTrackClicked={this.handleNextTrackClicked}
                    onSeek={this.handleSeek} />
            </div>
        );
    }
}