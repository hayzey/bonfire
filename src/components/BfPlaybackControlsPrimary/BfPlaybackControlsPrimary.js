import './BfPlaybackControlsPrimary.scss';

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

export class BfPlaybackControlsPrimary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="bf-playback-controls-primary">
                <IconButton
                    onClick={this.props.onPreviousTrackClicked}
                    variant="outlined"
                    color="primary"
                    className="previous-track-button">
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton
                    onClick={this.props.onTogglePlayClicked}
                    variant="outlined"
                    color="primary"
                    className="toggle-play-button">
                    { this.props.playing ? <PauseIcon /> : <PlayArrowIcon /> }
                </IconButton>
                <IconButton
                    onClick={this.props.onNextTrackClicked}
                    variant="outlined"
                    color="primary"
                    className="next-track-button">
                    <SkipNextIcon />
                </IconButton>
            </div>
        );
    }
}