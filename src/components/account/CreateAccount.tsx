import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, DialogContentText } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';

import React, { useState } from 'react';

type Props = {
    openCreateAccount: boolean;
    handleCloseCreateAccount: () => void;
    API: string;
}

// create account dialog pagae
const CreateAccount: React.FC<Props> = ({API, openCreateAccount, handleCloseCreateAccount}: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password_confirmation, setPassword_confirmation] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetCreateAccount = () => {
        setUsername("");
        setPassword("");
        setPassword_confirmation("");
    }

    // on clicking "create account" button, post to backend
    const handleSubmitCreateAccount = () => {
        let new_message: string[] = []; // reset messsage array
        fetch(API + "/users", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({
                username,
                password,
                password_confirmation,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    setSeverity('success');
                    new_message.push("Account created successfully. Log in to do more!")
                    setMessage(new_message);
                    // empty fields (prevent clicking create account again, although backend ensures unique username)
                    resetCreateAccount();
                    setTimeout(() => window.location.reload(), 1000); // refresh page
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    setSeverity('error');
                    data.error.map((error: string) =>
                        new_message.push(error));
                    setMessage(new_message);
                }
            })
            .catch((error) => console.log(error.message));
    }

    // dialog contains username, password and password confirmation fields, and "cancel" and "create account" buttons
    return (
        <Dialog open={openCreateAccount} onClose={handleCloseCreateAccount} fullWidth>
            <DialogTitle>Join the ChitChat Community!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Dont have an account? Create one to create threads, comment and more...
                </DialogContentText>
                {/* display success/error messages */}
                <AlertUser severity={severity} message={message}/>
                    <TextField
                        autoFocus
                        value={username}
                        type='text'
                        margin="normal"
                        label="Username"
                        fullWidth
                        variant="outlined"
                        onChange={event => setUsername(event.target.value.trim())} // whitespaces disallowed in username field
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
                    <TextField
                        value={password_confirmation}
                        type='password'
                        margin="normal"
                        label="Confirm Password"
                        fullWidth
                        variant="outlined"
                        onChange={event => setPassword_confirmation(event.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateAccount}>Close</Button>
                <Button onClick={handleSubmitCreateAccount}>Create Account</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAccount;