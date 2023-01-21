import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, DialogContentText } from '@material-ui/core';
import AlertUser from './AlertUser';
import { AlertColor } from '@mui/material/Alert';
import CurrentUserState from '../types/CurrentUserState';

import React, { useState } from 'react';
import GlobalMessageState from '../types/GlobalMessageState';

type Props = {
    openLogIn: boolean;
    handleCloseLogIn: () => void;
    currentUserState: CurrentUserState;
    globalMessageState: GlobalMessageState;
    API: string;
}

const LogIn: React.FC<Props> = ({API, openLogIn, handleCloseLogIn, currentUserState, globalMessageState}: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [severity, setSeverity] = useState<AlertColor | undefined>('success');
    const [message, setMessage] = useState<string[]>([]);

    const resetLogIn = () => {
        setUsername("");
        setPassword("");
    }

    const handleSubmitLogIn = () => {
        let new_message: string[] = [];
            fetch(API + "/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        setSeverity('error');
                        data.error.map((error: string) =>
                            new_message.push(error));
                        setMessage(new_message);
                    } else {
                        currentUserState.setCurrentUser(data.user);
                        localStorage.setItem("token", data.token);
                        setSeverity('success');
                        new_message.push("Logged in successfully!");
                        setMessage(new_message);
                        resetLogIn();
                        setTimeout(() => window.location.reload(), 1000);
                    }
                })
                .catch((error) => console.log(error.message));
    }

    return (
        <Dialog open={openLogIn} onClose={handleCloseLogIn} fullWidth>
            <DialogTitle>Welcome Back!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Log in to create threads, comment and more...
                </DialogContentText>
                <DialogContentText>
                    Dont have an account? Create one to do much more!
                </DialogContentText>
                <AlertUser severity={severity} message={message}/>
                <TextField
                    autoFocus
                    value={username}
                    type='text'
                    margin="normal"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    onChange={event => setUsername(event.target.value)}
                />
                <TextField
                    value={password}
                    type='password'
                    margin="normal"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    onChange={event => setPassword(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseLogIn}>Cancel</Button>
                <Button onClick={handleSubmitLogIn}>Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogIn;