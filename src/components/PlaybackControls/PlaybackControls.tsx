import './PlaybackControls.scss';
import React from 'react';

import { PlaybackState } from '../../services/SpotifyPlayer';
import { CurrentTrackInfo } from '../CurrentTrackInfo/CurrentTrackInfo';
import { PlaybackControlsPrimary } from '../PlaybackControlsPrimary/PlaybackControlsPrimary';
import { PlaybackControlsSecondary } from '../PlaybackControlsSecondary/PlaybackControlsSecondary';
import { VolumeControls } from '../VolumeControls/VolumeControls';
import { PlaybackProgress } from '../PlaybackProgress/PlaybackProgress';

interface PlaybackControlsProps {
    playbackState?: PlaybackState;
    ready: boolean;
    playing: boolean;
    position: number;
    volume: number;
    onSeek: (newPosition: number | number[]) => void;
    onPreviousTrackClicked: () => void;
    onTogglePlayClicked: () => void;
    onNextTrackClicked: () => void;
    onVolumeChanged: (newVolume: number | number[]) => void;
    onMuteClicked: () => void;
}

export class PlaybackControls extends React.Component<PlaybackControlsProps> {
    handleSeek = (newPosition: number | number[]) => {
        this.props.onSeek(newPosition);
    }

    handlePreviousTrackClicked = () => {
        this.props.onPreviousTrackClicked();
    }

    handleTogglePlayClicked = () => {
        this.props.onTogglePlayClicked();
    }

    handleNextTrackClicked = () => {
        this.props.onNextTrackClicked();
    }

    handleVolumeChanged = (newVolume: number | number[]) => {
        this.props.onVolumeChanged(newVolume);
    }

    handleMuteClicked = () => {
        this.props.onMuteClicked();
    }

    render() {
        return (
            <section className="playback-controls">
                <CurrentTrackInfo
                    ready={ this.props.ready }
                    playbackState={ this.props.playbackState }
                />
                
                <PlaybackControlsPrimary
                    ready={ this.props.ready }
                    onPreviousTrackClicked={ this.handlePreviousTrackClicked }
                    onTogglePlayClicked={ this.handleTogglePlayClicked }
                    onNextTrackClicked={ this.handleNextTrackClicked }
                    playing={ this.props.playing }
                />

                <PlaybackProgress
                    ready={ this.props.ready }
                    playbackState={ this.props.playbackState }
                    position={ this.props.position }
                    onSeek={ this.handleSeek }
                />

                <PlaybackControlsSecondary
                    ready={ this.props.ready }
                    playbackState={ this.props.playbackState }
                />

                <VolumeControls
                    ready={ this.props.ready }
                    volume={ this.props.volume }
                    onVolumeChanged={ this.handleVolumeChanged }
                    onMuteClicked={ this.handleMuteClicked }
                />
            </section>
        );
    }
}