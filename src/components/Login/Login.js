import React from 'react'
import './Login.css';
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase"
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    const [state, dispatch] = useStateValue();

    const signInWithGoogle = (e) => {
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
                src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd-1024-80.jpg.webp"
                alt="slack-logo"
                />
                <h1>Sign in to slack-clone</h1>
                <Button onClick={signInWithGoogle}><img src="../../img/btn_google_light_normal_ios.svg" alt="Google"></img>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login