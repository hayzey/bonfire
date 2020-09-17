import React from 'react';
import { Redirect } from 'react-router-dom';
import { BfAuthService } from '../../services/BfAuthService';

export class BfSpotifyAuthSuccess extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: false
        };
    }

    getHashValues() {
        let hash = window.location.hash;

        if (hash[0] === '#') {
            hash = hash.split('#')[1];
        }

        let hashValsArr = hash.split('&');
        let hashValsObj = {};
        
        for (let hashKeyAndVal of hashValsArr) {
            let keyAndValArr = hashKeyAndVal.split('=');
            let key = keyAndValArr[0];
            let val = keyAndValArr[1];

            hashValsObj[key] = val;
        }

        return hashValsObj;
    }

    finishAuth() {
        let authToken = this.getHashValues().access_token;
        // this.props.authService.finishAuth(authToken);
        console.log('abc', this.props.authService);
    }
    
    componentDidMount() {
        this.finishAuth();
    }
    
    render() {
        return (
            this.state.done ? <Redirect to="/" /> : <div></div>
        );
    }
}