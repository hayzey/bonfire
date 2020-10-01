import './MainContent.scss';

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { AllTracks } from '../AllTracks/AllTracks';

export class MainContent extends React.Component {
    render() {
        return (
            <div className="bf-main-content">
                <Router>
                    <Switch>
                        <Route path="/">
                            <AllTracks
                                playbackState={ this.props.playbackState }
                            />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}