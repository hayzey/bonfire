import React from 'react';

import { BfAuthService } from '../../services/BfAuthService';
import { BfSpotifyApi } from '../../services/BfSpotifyApi';
import { BfSpotifyDevice } from '../../services/BfSpotifyDevice';
import { BfAuthDialog } from '../BfAuthDialog/BfAuthDialog';
import { BfMainContent } from '../BfMainContent/BfMainContent';
import { BfMainContentLoader } from '../BfMainContentLoader/BfMainContentLoader';
import { BfPlaybackControls } from '../BfPlaybackControls/BfPlaybackControls';

import './BfMain.scss';

BfSpotifyApi.init();

export class BfMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthed: BfAuthService.isAuthed(),
            sdkReady: false,
            playerReady: false,
            playing: false,
            playbackState: null,
            position: 0,
            volume: 100,
            preMuteVolume: 100,
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
        this.handleVolumeChanged = this.handleVolumeChanged.bind(this);
        this.handleMuteClicked = this.handleMuteClicked.bind(this);
    }

    init() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const Spotify = window.Spotify;

            this.spotifyPlayer = new Spotify.Player({
                name: this.playerName,
                getOAuthToken: (cb) => {
                    let token = BfAuthService.getSpotifyAuthToken();
                    cb(token);
                }
            });

            // Connect to the player
            this.spotifyPlayer.connect()
                .then(success => {
                    if (success) {
                        console.info('The Web Playback SDK successfully connected to Spotify!', this.spotifyPlayer);

                        this.setState({
                            sdkReady: true
                        });
                    }
                });

            this.initListeners();
            this.startUpdatePositionInterval();
        };
    }

    initListeners() {
        // Error handling
        this.spotifyPlayer.addListener('initialization_error', ({ message }) => {
            console.error('initialization_error', message);
        });

        this.spotifyPlayer.addListener('authentication_error', ({ message }) => {
            console.error('authentication_error', message);
            BfAuthService.logOut();
        });
        
        this.spotifyPlayer.addListener('account_error', ({ message }) => {
            console.error('account_error', message);
        });

        this.spotifyPlayer.addListener('playback_error', ({ message }) => {
            console.error('playback_error', message);
        });

        this.spotifyPlayer.addListener('ready', ({ device_id }) => {
            BfSpotifyDevice.setAsCurrentDevice(device_id);

            this.setState({
                playerReady: true
            });
        });

        this.spotifyPlayer.addListener('not_ready', ({ device_id }) => {
            this.setState({
                playerReady: false
            });
        });

        this.spotifyPlayer.addListener('player_state_changed', (state) => {
            console.info('Player state changed', state);

            this.setState({
                playbackState: state,
                playing: !state.paused,
                position: state.position,
            });
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

    updateVolume(newVolume) {
        this.spotifyPlayer.setVolume(newVolume);
        
        this.setState({
            volume: newVolume
        });
    }

    toggleMute() {
        if (this.state.volume) {
            this.setState({
                preMuteVolume: this.state.volume
            });
    
            this.updateVolume(0);
        } else {
            this.updateVolume(this.state.preMuteVolume);
        }
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
    
    handleVolumeChanged(event, newVolume) {
        this.updateVolume(newVolume);
    }

    handleMuteClicked(event) {
        this.toggleMute();
    }

    componentDidMount() {
        this.onAuthChangedWatcher = BfAuthService.onAuthChanged((isAuthed) => {
            this.setState({
                isAuthed: !!isAuthed
            });
        });
        
        this.init();
    }

    componentWillUnmount() {
        this.cancelUpdatePositionInterval();
        
        if (this.onAuthChangedWatcher) {
            this.onAuthChangedWatcher();
        }
    }

    readyToRender() {
        return this.state.sdkReady && this.state.playerReady;
    }

    shouldShowAuthPrompt() {
        return !this.state.isAuthed && this.state.sdkReady;
    }

    render() {
        let classes = 'bf-main';
        
        return (
            <div className={classes}>
                <BfAuthDialog
                    open={ this.shouldShowAuthPrompt() }
                />
                
                {
                    this.readyToRender() ?
                    <BfMainContent /> :
                    <BfMainContentLoader />
                }

                <BfPlaybackControls
                    player={ this.player }
                    playbackState={ this.state.playbackState }
                    ready={ !!(this.state.isAuthed && this.readyToRender()) }
                    playing={ this.state.playing }
                    position={ this.state.position }
                    volume={ this.state.volume }
                    onTogglePlayClicked={ this.handleTogglePlayClicked }
                    onPreviousTrackClicked={ this.handlePreviousTrackClicked }
                    onNextTrackClicked={ this.handleNextTrackClicked }
                    onSeek={ this.handleSeek }
                    onVolumeChanged={ this.handleVolumeChanged }
                    onMuteClicked={ this.handleMuteClicked }
                />
            </div>
        );
    }
}