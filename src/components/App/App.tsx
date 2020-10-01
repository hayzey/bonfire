import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import { Main } from '../Main/Main';
import { SpotifyAuthSuccess } from '../SpotifyAuthSuccess/SpotifyAuthSuccess';
import { Spotify } from '../../services/SpotifyPlayer';

import './App.scss';

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: any;
        Spotify: Spotify;
    }
}

export class App extends React.Component {
    render() {
        return (
            <main className="bonfire-app">
                <Router>
                    <Switch>
                        <Route path="/spotify-auth-success">
                            <SpotifyAuthSuccess />
                        </Route>
                        <Route path="/">
                            <Main />
                        </Route>
                    </Switch>
                </Router>
            </main>
        );
    }
}
