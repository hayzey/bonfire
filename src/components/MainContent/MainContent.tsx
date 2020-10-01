import './MainContent.scss';

import React, { FunctionComponent } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { PlaybackState } from '../../services/SpotifyPlayer';
import { AllTracks } from '../AllTracks/AllTracks';

interface MainContentProps {
    playbackState?: PlaybackState;
}

export const MainContent: FunctionComponent<MainContentProps> = ({playbackState}) => {
    return (
        <div className="bf-main-content">
            <Router>
                <Switch>
                    <Route path="/">
                        <AllTracks
                            playbackState={ playbackState }
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}