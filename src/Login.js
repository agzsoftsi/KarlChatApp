import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import {IconButton} from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { DesktopWindows } from '@material-ui/icons';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) =>  {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    };

    return (
    <div className="login">
        <div className="login_container">
            <img src="https://i.imgur.com/13207e2.gif" alt="" /> 
            <div className="login_text">
                <h1>Sign In to <span className="karl-text">Karl</span><span className="chat-text">Chat</span></h1>
            </div>
            <Button onClick={signIn}>
                SIGN IN WITH GOOGLE
            </Button>
            
            <div className="social-icons">
            <IconButton>
               <a href="https://twitter.com/karlgarmor" target="_blank" rel="noreferrer"><TwitterIcon/></a> 
            </IconButton>
            <IconButton>
            <a href="https://github.com/agzsoftsi" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            </IconButton>
            <IconButton>
            <a href="https://www.youtube.com/channel/UCNXFDfsJ9PjCdE9dZBGGbSA" target="_blank" rel="noreferrer"> <YouTubeIcon/></a>
            </IconButton>
            <IconButton>
            <a href="https://www.linkedin.com/in/karlgarmor" target="_blank" rel="noreferrer"> <LinkedInIcon/></a>
            </IconButton>
            </div>
        </div>
    </div>
    );
}

export default Login;