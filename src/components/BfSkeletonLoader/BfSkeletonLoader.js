import './BfSkeletonLoader.scss';
import React from 'react';

export class BfSkeletonLoader extends React.Component {
    render() {
        let classes = 'bf-skeleton-loader';

        if (this.props.type === 'image') {
            classes += ' bf-skeleton-loader-image';
        }

        if (this.props.className) {
            classes += ` ${this.props.className}`;
        }
        
        return (
            <div
                className={ classes }
                aria-busy="true"
                aria-live="polite">
                <div className="loading-indicator"></div>
            </div>
        );
    }
}