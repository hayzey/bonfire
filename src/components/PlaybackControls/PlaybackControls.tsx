import './PlaybackControls.scss';
import React from 'react';

import { CurrentTrackInfo } from '../CurrentTrackInfo/CurrentTrackInfo';
import { PlaybackControlsPrimary } from '../PlaybackControlsPrimary/PlaybackControlsPrimary';
import { PlaybackControlsSecondary } from '../PlaybackControlsSecondary/PlaybackControlsSecondary';
import { PlaybackProgress } from '../PlaybackProgress/PlaybackProgress';

export class PlaybackControls extends React.Component {
    constructor(props) {
        super(props);

        this.onPreviousTrackClicked = this.props.onPreviousTrackClicked.bind(this);
        this.onTogglePlayClicked = this.props.onTogglePlayClicked.bind(this);
        this.onNextTrackClicked = this.props.onNextTrackClicked.bind(this);
    }
    
    render() {
        return (
            <section className="bf-playback-controls">
                <CurrentTrackInfo
                    ready={ this.props.ready }
                    playbackState={ this.props.playbackState }
                />

                <div className="primary-controls">
                    <PlaybackControlsPrimary
                        ready={ this.props.ready }
                        onPreviousTrackClicked={ this.props.onPreviousTrackClicked }
                        onTogglePlayClicked={ this.props.onTogglePlayClicked }
                        onNextTrackClicked={ this.props.onNextTrackClicked }
                        playing={ this.props.playing }
                    />

                    <PlaybackProgress
                        ready={ this.props.ready }
                        playbackState={ this.props.playbackState }
                        position={ this.props.position }
                        onSeek={ this.props.onSeek}
                    />
                </div>

                <PlaybackControlsSecondary
                    ready={ this.props.ready }
                    volume={ this.props.volume }
                    onVolumeChanged={ this.props.onVolumeChanged }
                    onMuteClicked={ this.props.onMuteClicked }
                />
            </section>
        );
    }
}