import React from 'react'
import './Login.css';
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase"
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signIn = (e) => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(error => {
            alert(error.message);
        })
    };

    return (
        <div className="login">
            <div className="login__card">
                <img
                src="../../img/slack_logo.png"
                alt="slack-logo"
                />
                <h1>Sign in to slack-clone</h1>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
