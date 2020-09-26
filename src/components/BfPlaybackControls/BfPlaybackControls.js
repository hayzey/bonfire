import './BfPlaybackControls.scss';
import React from 'react';

import { BfCurrentTrackInfo } from '../BfCurrentTrackInfo/BfCurrentTrackInfo';
import { BfPlaybackButtons } from '../BfPlaybackButtons/BfPlaybackButtons';
import { BfPlaybackProgress } from '../BfPlaybackProgress/BfPlaybackProgress';

export class BfPlaybackControls extends React.Component {
    constructor(props) {
        super(props);

        this.onPreviousTrackClicked = this.props.onPreviousTrackClicked.bind(this);
        this.onTogglePlayClicked = this.props.onTogglePlayClicked.bind(this);
        this.onNextTrackClicked = this.props.onNextTrackClicked.bind(this);

        this.handleSeek = this.handleSeek.bind(this);
    }

    handleSeek(newPosition) {
        this.props.onSeek(newPosition);
    }
    
    render() {
        return (
            <section className="bf-playback-controls">
                <BfCurrentTrackInfo playbackState={this.props.playbackState} />

                <div>
                    <BfPlaybackButtons
                        onPreviousTrackClicked={this.props.onPreviousTrackClicked}
                        onTogglePlayClicked={this.props.onTogglePlayClicked}
                        onNextTrackClicked={this.props.onNextTrackClicked}
                        playing={this.props.playing}
                    />

                    <BfPlaybackProgress
                        playbackState={this.props.playbackState}
                        position={this.props.position}
                        onSeek={this.handleSeek} />
                </div>
            </section>
        );
    }
}