import React from 'react';
import Button from '@material-ui/core/Button';

export class BfAuthPrompt extends React.Component {
    constructor(props) {
        super(props);

        this.authorize = this.authorize.bind(this);
    }

    authorize() {
        console.log('hmmm', this)
        this.props.authService.authorize();
    }

    render() {
        return (
            <div className="auth-prompt">
                <p>Please log in with Spotify to continue.</p>

                <Button
                    onClick={this.authorize}
                    variant="contained"
                    color="primary">
                    Log In
                </Button>
            </div>
        );
    }
}