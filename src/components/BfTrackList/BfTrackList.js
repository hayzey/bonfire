import './BfTrackList.scss';

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export class BfTrackList extends React.Component {
    getTrackName(track) {
        return track?.track?.name;
    }

    getTrackArtist(track) {
        return track?.track?.artists[0];
    }

    getTrackArtistName(track) {
        let trackArtist = this.getTrackArtist(track);

        if (trackArtist) {
            return trackArtist.name;
        }
    }

    getTrackAlbum(track) {
        return track?.track?.album;
    }

    getTrackAlbumName(track) {
        let trackAlbum = this.getTrackAlbum(track);

        if (trackAlbum) {
            return trackAlbum.name;
        }
    }

    isTrackPlaying(track) {
        // console.log('isTrackPlaying', track, this.props.playbackState);
        
        if (!track || !this.props.playbackState) {
            return false;
        }
        
        return track.track.id === this.props?.playbackState?.track_window?.current_track.id;
    }

    getTrackRowClasses(track) {
        let classes = 'track-row';

        if (this.isTrackPlaying(track)) {
            classes += ' track-playing';
        }

        return classes;
    }

    playTrack(track) {
        this.props.onPlayTrack(track);
    }

    handleTrackDoubleClick(track) {
        this.playTrack(track);
    }
    
    render() {
        return (
            <div className="bf-track-list">
                <TableContainer>
                    <Table aria-label="Tracks">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Album</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tracks.map((track) => (
                                <TableRow
                                    className={ this.getTrackRowClasses(track) }
                                    key={ track.track.id }
                                    onDoubleClick={ () => this.handleTrackDoubleClick(track) }
                                >
                                    <TableCell component="th" scope="row">{ this.getTrackName(track) }</TableCell>
                                    <TableCell>{ this.getTrackArtistName(track) }</TableCell>
                                    <TableCell>{ this.getTrackAlbumName(track) }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}