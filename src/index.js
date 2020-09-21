import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import './index.scss';

const mainTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#222'
        },
        primary: {
            main: '#FF9C61',
        },
        secondary: {
            main: '#74FFD8',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
