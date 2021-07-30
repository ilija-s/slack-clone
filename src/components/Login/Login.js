import React from 'react';
import './Login.css';

import { useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";
import db, { auth, provider } from "../../firebase"
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useStateValue();

    useHistory().push('/');

    const userExists = (id) => {
        return db.collection('users')
        .doc(id)
        .get()
        .then(data => {
            return data.exists;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const signInWithGoogle = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            userExists(result.user.uid)
            .then(exists => {
                if (!exists) {
                    db.collection('users').doc(result.user.uid).set({
                        id: result.user.uid,
                        name: result.user.displayName,
                        email: result.user.email,
                        image: result.user.photoURL,
                        isActive: true
                    });
                }

                db.collection('users').doc(result.user.uid).update({isActive: true});

                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch(error => {
                alert(error.message);
            });
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