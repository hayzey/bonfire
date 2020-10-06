import './TrackList.scss';

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import { PlaybackState } from '../../services/SpotifyPlayer';
import { MetaTrack } from '../../services/SpotifyTrack';

interface TrackListProps {
    playbackState?: PlaybackState;
    tracks: Array<MetaTrack>,
    onPlayTrack: (metaTrack: MetaTrack) => void
}

interface TrackListState {
    tracks: Array<MetaTrack>
}

export class TrackList extends React.Component<TrackListProps, TrackListState> {
    getTrackName(metaTrack: MetaTrack): string {
        return metaTrack?.track?.name;
    }

    getTrackArtist(metaTrack: MetaTrack) {
        return metaTrack?.track?.artists[0];
    }

    getTrackArtistName(metaTrack: MetaTrack) {
        let trackArtist = this.getTrackArtist(metaTrack);

        if (trackArtist) {
            return trackArtist.name;
        }
    }

    getTrackAlbum(metaTrack: MetaTrack) {
        return metaTrack?.track?.album;
    }

    getTrackAlbumName(metaTrack: MetaTrack) {
        let trackAlbum = this.getTrackAlbum(metaTrack);

        if (trackAlbum) {
            return trackAlbum.name;
        }
    }

    isTrackPlaying(metaTrack: MetaTrack) {
        if (!metaTrack || !this.props.playbackState) {
            return false;
        }
        
        return metaTrack.track.id === this.props?.playbackState?.track_window?.current_track.id;
    }

    getTrackRowClasses(metaTrack: MetaTrack) {
        let classes = 'track-row';

        if (this.isTrackPlaying(metaTrack)) {
            classes += ' track-playing';
        }

        return classes;
    }

    playTrack(metaTrack: MetaTrack) {
        this.props.onPlayTrack(metaTrack);
    }

    handleTrackPlayClick = (metaTrack: MetaTrack) => {
        this.playTrack(metaTrack);
    }
    
    render() {
        return (
            <div className="bf-track-list">
                <TableContainer>
                    <Table aria-label="Tracks">
                        <TableHead>
                            <TableRow>
                                <TableCell className="track-play-button-cell"></TableCell>
                                <TableCell className="track-title-cell">Title</TableCell>
                                <TableCell className="track-artist-cell">Artist</TableCell>
                                <TableCell className="track-album-cell">Album</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.tracks.map((track) => (
                                <TableRow
                                    className={ this.getTrackRowClasses(track) }
                                    key={ track.track.id }>
                                    <TableCell className="track-play-button-cell">
                                    <IconButton
                                        className="track-play-button"
                                        onClick={ () => this.handleTrackPlayClick(track) }
                                        size="small">
                                        <PlayCircleFilledIcon />
                                    </IconButton>
                                    </TableCell>
                                    <TableCell className="track-title-cell" component="th" scope="row">{ this.getTrackName(track) }</TableCell>
                                    <TableCell className="track-artist-cell">{ this.getTrackArtistName(track) }</TableCell>
                                    <TableCell className="track-album-cell">{ this.getTrackAlbumName(track) }</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}