import './AllTracks.scss';

import React from 'react';
import { PlaybackState } from '../../services/SpotifyPlayer';
import { SpotifyPlayer } from '../../services/SpotifyPlayer';
import { SpotifyTrack } from '../../services/SpotifyTrack';
import { MetaTrack } from '../../services/SpotifyTrack';
import { TrackList } from '../TrackList/TrackList';

interface AllTracksProps {
    playbackState?: PlaybackState;
}

interface AllTracksState {
    metaTracks: Array<MetaTrack>
}

export class AllTracks extends React.Component<AllTracksProps, AllTracksState> {
    readonly state: AllTracksState = {
        metaTracks: []
    };

    addTracksToList(metaTracks: Array<MetaTrack>) {
        let _metaTracks = this.state.metaTracks.concat(metaTracks);

        this.setState({
            metaTracks: _metaTracks
        });
    }

    syncFirstUserTracks() {
        return SpotifyTrack.queryUserTracks({
            limit: 50
        });
    }

    playTrack(metaTrack: MetaTrack) {
        let trackUri = metaTrack.track.uri;
        SpotifyPlayer.playTracks([trackUri]);
    }

    handlePlayTrack = (metaTrack: MetaTrack) => {
        this.playTrack(metaTrack);
    }

    componentDidMount() {
        this.syncFirstUserTracks()
            .then((res) => {
                console.info('Synced User Tracks', res);
                this.addTracksToList(res.data.items);
            });
    }

    render() {
        return (
            <div className="bf-all-tracks">
                <TrackList
                    metaTracks={this.state.metaTracks}
                    onPlayTrack={this.handlePlayTrack}
                    playbackState={ this.props.playbackState }
                />
            </div>
        );
    }
}