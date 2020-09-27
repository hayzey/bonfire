import './BfMainContent.scss';

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { BfAllTracks } from '../BfAllTracks/BfAllTracks';

export class BfMainContent extends React.Component {
    render() {
        return (
            <div className="bf-main-content">
                <Router>
                    <Switch>
                        <Route path="/">
                            <BfAllTracks></BfAllTracks>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}