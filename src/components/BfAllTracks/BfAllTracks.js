import './BfAllTracks.scss';

import React from 'react';
import { BfSpotifyTrack } from '../../services/BfSpotifyTrack';
import { BfTrackList } from '../BfTrackList/BfTrackList';

export class BfAllTracks extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tracks: []
        };
    }
    
    addTracksToList(tracks) {
        let _tracks = this.state.tracks.concat(tracks);
        
        this.setState({
            tracks: _tracks
        })
    }
    
    syncFirstUserTracks() {
        return BfSpotifyTrack.queryUserTracks({
            limit: 50
        });
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
                <BfTrackList
                    tracks={ this.state.tracks }
                />
            </div>
        );
    }
}