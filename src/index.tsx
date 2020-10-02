import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { App } from './components/App/App';

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
    <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);