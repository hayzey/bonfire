import './BfCurrentTrackInfo.scss';
import React from 'react';
import { BfSkeletonLoader } from '../BfSkeletonLoader/BfSkeletonLoader';

export class BfCurrentTrackInfo extends React.Component {
    constructor(props) {
        super(props);
    }

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

    getAlbumImageUrl() {
        let albumImage = this.getAlbumImage();
        return albumImage && albumImage.url;
    }

    render() {
        let content;

        if (this.props.ready) {
            content = (
                <div className="bf-current-track-info">
                    <div className="album-cover-container">
                        <img
                            className="album-cover"
                            src={this.getAlbumImageUrl() } />
                    </div>
                    <div className="main-track-info">
                        <p className="track-name">{ this.getTrackName() }</p>
                        <p className="artist-name">{ this.getTrackArtistName() }</p>
                    </div>
                </div>
            );
        } else {
            content = (
                <div className="bf-current-track-info">
                    <div className="album-cover-container">
                        <BfSkeletonLoader
                            className="album-cover-loader"
                            type="image">
                        </BfSkeletonLoader>
                    </div>
                    <div className="main-track-info">
                        <BfSkeletonLoader></BfSkeletonLoader>
                        <BfSkeletonLoader></BfSkeletonLoader>
                    </div>
                </div>
            );
        }
        
        return content;
    }
}