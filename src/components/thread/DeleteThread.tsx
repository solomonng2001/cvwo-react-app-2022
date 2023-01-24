import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';

import React, { useState } from 'react';

type Props = {
    openDeleteThread: boolean;
    handleCloseDeleteThread: () => void;
    thread_page_id: number;
    API: string;
}

// Delete thread dialog page
const DeleteThread: React.FC<Props> = ({API, openDeleteThread, handleCloseDeleteThread, thread_page_id}: Props) => {
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);
    
    // On clicking submit button, delete thread in backend
    const handleSubmitDeleteThread = () => {
        let new_message: string[] = [];
        fetch(API + "/thread_pages/" + thread_page_id.toString(), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                },
        })
            .then((response) => {
                if (response.ok) {
                    setSeverity('success');
                    new_message.push("You have deleted thread!")
                    setMessage(new_message);
                    const url = window.location.href;

                    // If page before opening dialog was individual threads page (ThreadView page), return to home, since thread deleted
                    // Else, return to page user was on
                    setTimeout(url.startsWith(window.location.protocol + "//" + window.location.host + "/thread")
                        ? () => window.location.replace(window.location.protocol + "//" + window.location.host)
                        : () => window.location.reload(), 1000);
                } else {
                    setSeverity('error');
                    new_message.push("Some error occured");
                    setMessage(new_message);
                }
            })
            .catch((error) => console.log(error.message));
    }

    // Dialog page contains "cancel" and "delete thread" buttons
    return (
        <Dialog open={openDeleteThread} onClose={handleCloseDeleteThread} fullWidth>
            <DialogTitle>Are you sure you want to delete this thread?</DialogTitle>
            {/* Display success / error messages */}
            <DialogContent>
                <AlertUser severity={severity} message={message}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteThread}>Cancel</Button>
                <Button onClick={handleSubmitDeleteThread}>Delete Thread</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteThread;