import './PlaybackControlsPrimary.scss';

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';


interface PlaybackControlsPrimaryProps {
    ready: boolean;
    playing: boolean;
    onPreviousTrackClicked: () => void;
    onTogglePlayClicked: () => void;
    onNextTrackClicked: () => void;
}

export class PlaybackControlsPrimary extends React.Component<PlaybackControlsPrimaryProps> {
    render() {
        return (
            <div className="bf-playback-controls-primary">
                <IconButton
                    className="previous-track-button"
                    disabled={ !this.props.ready }
                    onClick={this.props.onPreviousTrackClicked}
                    color="primary">
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton
                    className="toggle-play-button"
                    disabled={ !this.props.ready }
                    onClick={this.props.onTogglePlayClicked}
                    color="primary">
                    { this.props.playing ? <PauseIcon /> : <PlayArrowIcon /> }
                </IconButton>
                <IconButton
                    className="next-track-button"
                    disabled={ !this.props.ready }
                    onClick={this.props.onNextTrackClicked}
                    color="primary">
                    <SkipNextIcon />
                </IconButton>
            </div>
        );
    }
}