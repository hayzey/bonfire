import './SkeletonLoader.scss';
import React, { FunctionComponent } from 'react';

interface SkeletonLoaderProps {
    className?: string;
    type?: string;
}

export const SkeletonLoader: FunctionComponent<SkeletonLoaderProps> = ({type, className}) => {
    let classes = 'skeleton-loader';

    if (type === 'image') {
        classes += ' skeleton-loader-image';
    }

    if (className) {
        classes += ` ${className}`;
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