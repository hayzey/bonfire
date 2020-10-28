import './PlaybackProgress.scss';

import React from 'react';
import Slider from '@material-ui/core/Slider';
import { PlaybackState } from '../../services/SpotifyPlayer';

interface PlaybackProgressProps {
    playbackState?: PlaybackState;
    ready: boolean;
    position: number;
    onSeek: (newPosition: number | number[]) => void;
}

export class PlaybackProgress extends React.Component<PlaybackProgressProps> {
    getPosition() : number {
        return this.props?.position || 0;
    }

    getDuration() : number {
        return this.props?.playbackState?.duration || 0;
    }

    getPositionPercentage() : number {
        const position = this.getPosition();
        const duration = this.getDuration();

        if (typeof position !== 'number' || typeof duration !== 'number') {
            return 0;
        }

        return position / duration * 100;
    }

    convertMsToDisplayString(ms : number) : string {
        if (typeof ms !== 'number') {
            return '0:00';
        }

        let secs = ms / 1000;
        let displayMins = String(Math.floor(secs / 60));
        let secsInMinute = Math.floor(secs % 60);
        let displaySecs : string;

        if (secsInMinute < 10) {
            displaySecs = `0${secsInMinute}`;
        } else {
            displaySecs = String(secsInMinute);
        }

        let result = `${displayMins}:${displaySecs}`;
        
        return result;
    }

    getDisplayPosition() : string {
        return this.convertMsToDisplayString(this.getPosition());
    }

    getDisplayDuration() : string {
        return this.convertMsToDisplayString(this.getDuration());
    }

    handleSeek = (event : object, newPosition: number | number[]) : void => {
        this.props.onSeek(newPosition);
    }

    render() {
        return (
            <div className="playback-progress">
                <p className="progress-value">{ this.getDisplayPosition() }</p>
                <div className="track-position-slider-container">
                    <Slider
                        className="track-position-slider"
                        disabled={ !this.props.ready }
                        value={ this.getPosition() }
                        min={ 0 }
                        max={ this.getDuration() }
                        onChangeCommitted={ this.handleSeek }
                    />
                </div>
                <p className="progress-value">{ this.getDisplayDuration() }</p>
            </div>
        );
    }
}