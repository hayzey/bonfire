import './PlaybackProgress.scss';

import React from 'react';
import Slider from '@material-ui/core/Slider';

export class PlaybackProgress extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleProgressSlider = this.handleProgressSlider.bind(this);
    }

    getPosition() {
        return this.props?.position || 0;
    }

    getDuration() {
        return this.props?.playbackState?.duration || 0;
    }

    getPositionPercentage() {
        const position = this.getPosition();
        const duration = this.getDuration();

        if (typeof position !== 'number' || typeof duration !== 'number') {
            return 0;
        }

        return position / duration * 100;
    }

    convertMsToDisplayString(ms) {
        if (typeof ms !== 'number') {
            return '0:00';
        }

        let secs = ms / 1000;
        let displayMins = String(Math.floor(secs / 60));
        let displaySecs = Math.floor(secs % 60);

        if (displaySecs < 10) {
            displaySecs = `0${displaySecs}`;
        } else {
            displaySecs = String(displaySecs);
        }

        let result = `${displayMins}:${displaySecs}`;
        
        return result;
    }

    getDisplayPosition() {
        return this.convertMsToDisplayString(this.getPosition());
    }

    getDisplayDuration() {
        return this.convertMsToDisplayString(this.getDuration());
    }

    handleProgressSlider(event, newPosition) {
        this.props.onSeek(newPosition);
    }

    render() {
        return (
            <div className="bf-playback-progress">
                <p className="progress-value">{ this.getDisplayPosition() }</p>
                <div className="track-position-slider-container">
                    <Slider
                        className="track-position-slider"
                        disabled={ !this.props.ready }
                        value={this.getPosition()}
                        min={0}
                        max={this.getDuration()}
                        onChangeCommitted={this.handleProgressSlider}
                    />
                </div>
                <p className="progress-value">{ this.getDisplayDuration() }</p>
            </div>
        );
    }
}