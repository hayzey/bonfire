import './BfPlaybackControls.scss';
import React from 'react';

import { BfCurrentTrackInfo } from '../BfCurrentTrackInfo/BfCurrentTrackInfo';
import { BfPlaybackControlsPrimary } from '../BfPlaybackControlsPrimary/BfPlaybackControlsPrimary';
import { BfPlaybackControlsSecondary } from '../BfPlaybackControlsSecondary/BfPlaybackControlsSecondary';
import { BfPlaybackProgress } from '../BfPlaybackProgress/BfPlaybackProgress';

export class BfPlaybackControls extends React.Component {
    constructor(props) {
        super(props);

        this.onPreviousTrackClicked = this.props.onPreviousTrackClicked.bind(this);
        this.onTogglePlayClicked = this.props.onTogglePlayClicked.bind(this);
        this.onNextTrackClicked = this.props.onNextTrackClicked.bind(this);
    }
    
    render() {
        return (
            <section className="bf-playback-controls">
                <BfCurrentTrackInfo playbackState={this.props.playbackState} />

                <div className="primary-controls">
                    <BfPlaybackControlsPrimary
                        onPreviousTrackClicked={this.props.onPreviousTrackClicked}
                        onTogglePlayClicked={this.props.onTogglePlayClicked}
                        onNextTrackClicked={this.props.onNextTrackClicked}
                        playing={this.props.playing}
                    />

                    <BfPlaybackProgress
                        playbackState={this.props.playbackState}
                        position={this.props.position}
                        onSeek={this.props.onSeek} />
                </div>

                <BfPlaybackControlsSecondary
                    volume={this.props.volume}
                    onVolumeChanged={this.props.onVolumeChanged}
                    onMuteClicked={this.props.onMuteClicked}
                />
            </section>
        );
    }
}