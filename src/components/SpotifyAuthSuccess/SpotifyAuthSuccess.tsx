import React from 'react';
import { Redirect } from 'react-router-dom';

import { AuthService } from '../../services/AuthService';

interface SpotifyAuthSuccessProps {}

interface SpotifyAuthSuccessState {
    done: boolean;
}

export class SpotifyAuthSuccess extends React.Component<SpotifyAuthSuccessProps, SpotifyAuthSuccessState> {
    readonly state: SpotifyAuthSuccessState = {
        done: false
    };

    getHashValues() {
        let hash = window.location.hash;

        if (hash[0] === '#') {
            hash = hash.split('#')[1];
        }

        let hashValsArr = hash.split('&');
        let hashValsObj : any = {};
        
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
        AuthService.setSpotifyAuthToken(authToken);

        this.setState({
            done: true
        });
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