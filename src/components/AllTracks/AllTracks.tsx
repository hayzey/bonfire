import './AllTracks.scss';

import React from 'react';
import { SpotifyPlayer } from '../../services/SpotifyPlayer';
import { SpotifyTrack } from '../../services/SpotifyTrack';
import { MetaTrack } from '../../services/SpotifyTrack';
import { TrackList } from '../TrackList/TrackList';

interface AllTracksProps {
    playbackState: object
}

interface AllTracksState {
    tracks: Array<MetaTrack>
}

export class AllTracks extends React.Component<AllTracksProps, AllTracksState> {
    // constructor(props: object) {
    //     super(props);

    //     this.state = {
    //         tracks: []
    //     };

    //     this.handlePlayTrack = this.handlePlayTrack.bind(this);
    // }

    readonly state: AllTracksState = {
        tracks: []
    };

    addTracksToList(tracks: Array<MetaTrack>) {
        let _tracks = this.state.tracks.concat(tracks);

        this.setState({
            tracks: _tracks
        })
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

    handlePlayTrack(metaTrack: MetaTrack) {
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
                    tracks={this.state.tracks}
                    onPlayTrack={this.handlePlayTrack}
                    playbackState={ this.props.playbackState }
                />
            </div>
        );
    }
}