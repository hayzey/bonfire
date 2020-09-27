import './BfAuthDialog.scss';

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { BfAuthService } from '../../services/BfAuthService';

export class BfAuthDialog extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleLoginClick() {
        BfAuthService.authorize();
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
                    <p>Please log in with Spotify to continue.</p>
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