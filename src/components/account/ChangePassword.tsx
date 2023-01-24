import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import CurrentUserState from '../../types/CurrentUserState';

import React, { useState } from 'react';

type Props = {
    openChangePassword: boolean;
    handleCloseChangePassword: () => void;
    currentUserState: CurrentUserState;
    API: string;
}

const ChangePassword: React.FC<Props> = ({API, openChangePassword, handleCloseChangePassword, currentUserState}: Props) => {
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetChangePassword = () => {
        setNewPassword("");
        setNewPasswordConfirmation("");
    }

    // on clicking "change password" button, patch changes to backend
    const handleSubmitChangePassword = () => {
        const password = newPassword;
        const password_confirmation = newPasswordConfirmation;
        let new_message: string[] = [];
            fetch(API + "/users/" + currentUserState.currentUser.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    password,
                    password_confirmation,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("Password Changed!")
                        setMessage(new_message);
                        // empty fieds (prevent user from repeatedly chaning password again)
                        resetChangePassword();
                        // refresh page
                        setTimeout(() => window.location.reload(), 1000);
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
        // }
    }

    // dialog contains password and password confirmation fields, and "close" and "change password" buttons
    return (
        <Dialog open={openChangePassword} onClose={handleCloseChangePassword} fullWidth>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                display success/error messages
                <AlertUser severity={severity} message={message}/>
                    <TextField
                        value={newPassword}
                        type='password'
                        margin="normal"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        onChange={event => setNewPassword(event.target.value)}
                    />
                    <TextField
                        value={newPasswordConfirmation}
                        type='password'
                        margin="normal"
                        label="Confirm Password"
                        fullWidth
                        variant="outlined"
                        onChange={event => setNewPasswordConfirmation(event.target.value)}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseChangePassword}>Close</Button>
                <Button onClick={handleSubmitChangePassword}>Change Password</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChangePassword;