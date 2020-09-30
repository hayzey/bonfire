import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { BfMain } from '../BfMain/BfMain';
import { BfSpotifyAuthSuccess } from '../BfSpotifyAuthSuccess/BfSpotifyAuthSuccess';

import './App.scss';

export class App extends React.Component {
    render() {
        return (
            <main className="bonfire-app">
                <Router>
                    <Switch>
                        <Route path="/spotify-auth-success">
                            <BfSpotifyAuthSuccess />
                        </Route>
                        <Route path="/">
                            <BfMain />
                        </Route>
                    </Switch>
                </Router>
            </main>
        );
    }
}
