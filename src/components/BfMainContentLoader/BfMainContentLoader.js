import './BfMainContentLoader.scss';

import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export class BfMainContentLoader extends React.Component {
    render() {
        return (
            <div className="bf-main-content-loader">
                <CircularProgress
                    className="loader"
                    size="64px"
                />
            </div>
        );
    }
}