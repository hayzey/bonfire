import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './App.css';

import { BfPlayerService } from '../../services/BfPlayerService';
import { BfAuthService } from '../../services/BfAuthService';

import { BfAuthPrompt } from '../BfAuthPrompt/BfAuthPrompt';
import { BfMain } from '../BfMain/BfMain';
import { BfSpotifyAuthSuccess } from '../BfSpotifyAuthSuccess/BfSpotifyAuthSuccess';


const player = new BfPlayerService();
player.init();

const auth = new BfAuthService();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthed: false
        };
    }

    handleAuthChanged(isAuthed) {
        this.setState({
            isAuthed: !!isAuthed
        });
    }

    render() {
        return (
            <div className="bonfire-app">
                <Router>
                    <Switch>
                        <Route path="/login">
                            <BfAuthPrompt
                                authService={auth}
                                onAuthChanged={this.handleAuthChanged} />
                        </Route>
                        <Route path="/spotify-auth-success">
                            <BfSpotifyAuthSuccess
                                authService={auth} />
                        </Route>
                        <Route path="/">
                            <BfMain
                                authService={auth} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

// {
//     auth.isAuthed() ?
//     <BfMain
//         authService={auth} /> :
//     <BfAuthPrompt
//         authService={auth}
//         onAuthChanged={this.handleAuthChanged} />
// }

export default App;
