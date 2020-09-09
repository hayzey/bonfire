import React from 'react';
import './App.css';

import { BfPlayerService } from '../../services/BfPlayerService';
import { BfAuthService } from '../../services/BfAuthService';

import Button from '@material-ui/core/Button';
import { BfAuthPrompt } from '../BfAuthPrompt/BfAuthPrompt';
import { BfMain } from '../BfMain/BfMain';


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
                {
                    auth.isAuthed() ?
                    <BfMain
                        authService={auth} /> :
                    <BfAuthPrompt
                        authService={auth}
                        onAuthChanged={this.handleAuthChanged} />
                }
            </div>
        );
    }
}

export default App;
