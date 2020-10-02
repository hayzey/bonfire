import './MainContentLoader.scss';

import React, { FunctionComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const MainContentLoader: FunctionComponent = () => {
    return (
        <div className="bf-main-content-loader">
            <CircularProgress
                className="loader"
                size="64px"
            />
        </div>
    );
}