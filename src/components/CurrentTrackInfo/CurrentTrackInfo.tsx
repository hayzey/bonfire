import './CurrentTrackInfo.scss';
import React from 'react';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import { PlaybackState } from '../../services/SpotifyPlayer';

interface CurrentTrackInfoProps {
    playbackState?: PlaybackState;
    ready: boolean;
}

interface CurrentTrackInfoState {
    albumCoverSpinning: boolean;
}

export class CurrentTrackInfo extends React.Component<CurrentTrackInfoProps, CurrentTrackInfoState> {
    albumCoverSpinningClass = 'spinning-record';

    readonly state: CurrentTrackInfoState = {
        albumCoverSpinning: false
    };
    
    getCurrentTrack() {
        return this.props.playbackState?.track_window?.current_track;
    }

    getTrackName() {
        const currentTrack = this.getCurrentTrack();
        return currentTrack && currentTrack.name;
    }

    getTrackArtist() {
        const currentTrack = this.getCurrentTrack();
        return currentTrack && currentTrack.artists[0];
    }
    
    getTrackArtistName() {
        const artist = this.getTrackArtist();
        return artist && artist.name;
    }
    
    getAlbum() {
        const currentTrack = this.getCurrentTrack();
        return currentTrack && currentTrack.album;
    }
    
    getAlbumImage() {
        const album = this.getAlbum();

        if (!album) {
            return;
        }

        return Array.isArray(album.images) && album.images[0];
    }

    getAlbumImageUrl() : string | undefined {
        let albumImage = this.getAlbumImage();

        if (!albumImage) {
            return;
        }
        
        return albumImage.url;
    }

    getAlbumName() : string | undefined {
        let album = this.getAlbum();

        if (!album) {
            return;
        }
        
        return album.name;
    }

    getAlbumImageAltText() : string {
        let albumName = this.getAlbumName();

        if (albumName) {
            return `Album cover for ${albumName}`;
        }

        return 'Album cover loading...';
    }

    toggleAlbumSpinning() {
        this.setState({
            albumCoverSpinning: !this.state.albumCoverSpinning
        });
    }

    getAlbumCoverClasses() {
        let classes = 'album-cover-container';

        if (this.state.albumCoverSpinning) {
            classes += ` ${this.albumCoverSpinningClass}`;
        }

        return classes;
    }
    
    handleAlbumCoverClicked = () => {
        this.toggleAlbumSpinning();
    }

    render() {
        let content;

        if (this.props.ready) {
            content = (
                <div className="current-track-info">
                    <div
                        className={ this.getAlbumCoverClasses() }
                        onClick={ this.handleAlbumCoverClicked }>
                        <img
                            className="album-cover"
                            src={ this.getAlbumImageUrl() }
                            alt={ this.getAlbumImageAltText() }
                        />
                    </div>
                    <div className="main-track-info">
                        <p className="track-name truncate">{ this.getTrackName() }</p>
                        <p className="artist-name truncate">{ this.getTrackArtistName() }</p>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className="current-track-info">
                    <div className="album-cover-container">
                        <SkeletonLoader
                            className="album-cover-loader"
                            type="image">
                        </SkeletonLoader>
                    </div>
                    <div className="main-track-info">
                        <SkeletonLoader></SkeletonLoader>
                        <SkeletonLoader></SkeletonLoader>
                    </div>
                </div>
            );
        }
        
        return content;
    }
}