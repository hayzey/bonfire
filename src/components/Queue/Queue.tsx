// import './Queue.scss';

import React from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { PlaybackState } from '../../services/SpotifyPlayer';
import { Track } from '../../services/SpotifyTrack';
import { TrackList } from '../TrackList/TrackList';

interface QueueProps {
    playbackState?: PlaybackState;
    queueOpen: boolean;
    onToggleQueue: () => void;
}

export class Queue extends React.Component<QueueProps> {
    queueDrawerAnchor : string | any = 'right';
    
    handleToggleQueue = (event: object) => {
        // this.queueDrawerOpen = !this.queueDrawerOpen;
        this.props.onToggleQueue();
    }

    getQueuedTracks() : Track[] | any[] {
        return this.props.playbackState?.track_window?.next_tracks || [];
    }
    
    handlePlayTrack = () => {
        
    }

    render() {
        return (
            <Drawer
                anchor={ this.queueDrawerAnchor }
                open={ this.props.queueOpen }
                onClose={ this.handleToggleQueue }>
                <TrackList
                    tracks={ this.getQueuedTracks() }
                    onPlayTrack={ this.handlePlayTrack }
                    playbackState={ this.props.playbackState }
                />
            </Drawer>
        );
    }
}