import './BfPlaybackProgress.scss';

import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export class BfPlaybackProgress extends React.Component {
    getPosition() {
        return this.props?.playbackState?.position;
    }

    getDuration() {
        return this.props?.playbackState?.duration;
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

    render() {
        return (
            <div className="bf-playback-progress">
                <p className="progress-value">{ this.getDisplayPosition() }</p>
                <LinearProgress
                    className="playback-progress-bar"
                    variant="determinate"
                    value={this.getPositionPercentage()}
                />
                <p className="progress-value">{ this.getDisplayDuration() }</p>
            </div>
        );
    }
}