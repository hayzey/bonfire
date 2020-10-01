import './PlaybackControlsSecondary.scss';

import React from 'react';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

export class PlaybackControlsSecondary extends React.Component {
    constructor(props) {
        super(props);
    }

    getVolumeLevelIcon() {
        let volume = this.props.volume;
        
        if (typeof volume !== 'number' || volume === 0) {
            return <VolumeOffIcon />;
        } else if (volume <= 0.33) {
            return <VolumeMuteIcon />;
        } else if (volume <= 0.66) {
            return <VolumeDownIcon />;
        } else {
            return <VolumeUpIcon />;
        }
    }

    render() {
        return (
            <div className="bf-playback-controls-secondary">
                <div className="volume-controls">
                    <IconButton
                        className="toggle-mute-button"
                        disabled={ !this.props.ready }
                        onClick={this.props.onMuteClicked}
                        size="small">
                        { this.getVolumeLevelIcon() }
                    </IconButton>
                    <Slider
                        className="volume-slider"
                        disabled={ !this.props.ready }
                        value={this.props.volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={this.props.onVolumeChanged}
                    />
                </div>
            </div>
        );
    }
}