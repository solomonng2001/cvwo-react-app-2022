import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, DialogContentText } from '@material-ui/core';

import React from 'react';

type Props = {
    openLogIn: boolean;
    handleCloseLogIn: () => void;
}

const LogIn: React.FC<Props> = ({openLogIn, handleCloseLogIn}: Props) => {


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
                <TextField
                    autoFocus
                    type='text'
                    margin="normal"
                    label="Username"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    type='password'
                    margin="normal"
                    label="Password"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseLogIn}>Cancel</Button>
                <Button onClick={handleCloseLogIn}>Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogIn;