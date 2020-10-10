import './PlaybackControlsSecondary.scss';

import React from 'react';
import Button from '@material-ui/core/Button';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { PlaybackState } from '../../services/SpotifyPlayer';
import { Queue } from '../Queue/Queue';

interface PlaybackControlsSecondaryProps {
    ready: boolean;
    playbackState?: PlaybackState;
}

export class PlaybackControlsSecondary extends React.Component<PlaybackControlsSecondaryProps> {
    queueDrawerAnchor : string | any = 'right';
    queueOpen : boolean = false;
    
    handleToggleQueue = () => {
        this.queueOpen = !this.queueOpen;
    }

    render() {
        return (
            <div className="playback-controls-secondary">
                <Button
                    className="toggle-show-queue-button"
                    disabled={ !this.props.ready }
                    onClick={ this.handleToggleQueue }
                    startIcon={ <QueueMusicIcon /> }>
                    <span>Queue</span>
                </Button>
                <Queue
                    playbackState={ this.props.playbackState }
                    queueOpen={ this.queueOpen }
                    onToggleQueue={ this.handleToggleQueue }>
                </Queue>
            </div>
        );
    }
}