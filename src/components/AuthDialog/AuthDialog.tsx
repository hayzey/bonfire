import './AuthDialog.scss';

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { AuthService } from '../../services/AuthService';

interface AuthDialogProps {
    open: boolean
}

export class AuthDialog extends React.Component<AuthDialogProps> {
    handleLoginClick(): void {
        AuthService.authorize();
    }

    render() {
        return (
            <Dialog
                className="bf-auth-dialog"
                open={this.props.open}
                maxWidth={"xs"}
                fullWidth={true}>
                <DialogTitle className="dialog-header">
                    <span>Log In</span>
                </DialogTitle>

                <DialogContent className="dialog-content">
                    <p>Please log in with Spotify to continue. You must have a Spotify Premium membership to use this app!</p>
                    <p>
                        <a href="https://www.spotify.com/premium/">
                            Learn more about Spotify Premium...
                        </a>
                    </p>
                </DialogContent>

                <DialogActions>
                    <Button
                        className="login-button"
                        onClick={this.handleLoginClick}
                        variant="contained"
                        color="primary">
                        Log In
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}