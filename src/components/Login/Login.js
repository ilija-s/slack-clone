import React from 'react';
import './Login.css';

import { Button } from "@material-ui/core";
import db, { auth, provider } from "../../firebase"
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStateValue();

    const userExists = (id) => {
        let exists = false;
        db.collection('users')
        .where("id", "==", id)
        .get()
        .then(data => {
            if (!data.empty)
                exists = true;
        })
        .catch((error) => {
            console.log(error);
        })
        return exists;
    }

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            const userAlreadyExists = userExists(result.user.uid);

            if (userAlreadyExists) {
                db.collection('users').add({
                    id: result.user.uid,
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                    isActive: true
                });
            }

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
                <Button onClick={signInWithGoogle}><img id="google-img" src="https://avatars.githubusercontent.com/u/7328930?v=4" alt="Google"></img>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login