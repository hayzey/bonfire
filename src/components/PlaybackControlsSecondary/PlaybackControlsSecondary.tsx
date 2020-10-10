import './PlaybackControlsSecondary.scss';

import React from 'react';
import Button from '@material-ui/core/Button';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

interface PlaybackControlsSecondaryProps {
    ready: boolean;
    onToggleQueueClicked: () => void;
}

export class PlaybackControlsSecondary extends React.Component<PlaybackControlsSecondaryProps> {
    handleToggleQueueClicked = (event: object) => {
        this.props.onToggleQueueClicked();
    }

    render() {
        return (
            <div className="playback-controls-secondary">
                <Button
                    className="toggle-show-queue-button"
                    disabled={ !this.props.ready }
                    onClick={ this.handleToggleQueueClicked }
                    startIcon={ <QueueMusicIcon /> }>
                    <span>Queue</span>
                </Button>
            </div>
        );
    }
}