import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import './BfPlaybackControls.scss';

import { BfSpotifyDevice } from '../../services/BfSpotifyDevice';

export class BfPlaybackControls extends React.Component {
    constructor(props) {
        super(props);

        // BfSpotifyDevice.query();
    }

    componentDidMount() {
        BfSpotifyDevice.query();
    }
    
    render() {
        return (
            <section className="playback-controls">
                <div className="current-track-info">
                    <p>{this.props.playbackState ? this.props.playbackState.track_window.current_track.name : null }</p>
                </div>

                <div className="main-playback-buttons">
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
            </section>
        );
    }
}