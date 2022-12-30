import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, DialogContentText } from '@material-ui/core';
import AlertUser from './AlertUser';
import { AlertColor } from '@mui/material/Alert';

import React, { useState } from 'react';

type Props = {
    openCreateAccount: boolean;
    handleCloseCreateAccount: () => void;
}

const CreateAccount: React.FC<Props> = ({openCreateAccount, handleCloseCreateAccount}: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>('success');
    const [message, setMessage] = useState<string>("3");

    const handleSubmitCreateAccount = () => {
        // setSeverity(undefined);
        // setMessage("1234");
        // console.log("testing");
        // if (password !== confirmPassword) {
        //     setSeverity('error');
        //     setMessage(message + "Passwords do not match. ");
        //     console.log("testing1");
        // }
        // console.log("testing2");
        // if (username === "" || password === "" || confirmPassword === "") {
        //     setSeverity('error');
        //     setMessage("Fill in all fields. ");
        //     console.log("testing3");
        // }
        // console.log("testing4");
        // let new_message = "";
        // new_message = new_message + "1";
        // new_message = new_message + "2";

        // setSeverity('error');
        // setMessage('2');
        // setMessage(message + new_message);
    }

    return (
        <Dialog open={openCreateAccount} onClose={handleCloseCreateAccount} fullWidth>
            <DialogTitle>Join the ChitChat Community!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Dont have an account? Create one to create threads, comment and more...
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
                    <TextField
                        value={confirmPassword}
                        type='password'
                        margin="normal"
                        label="Confirm Password"
                        fullWidth
                        variant="outlined"
                        onChange={event => setConfirmPassword(event.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateAccount}>Cancel</Button>
                <Button onClick={handleSubmitCreateAccount}>Create Account</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateAccount;