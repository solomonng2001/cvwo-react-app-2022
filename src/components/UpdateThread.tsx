import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle} from '@material-ui/core';
import AlertUser from './AlertUser';
import { AlertColor } from '@mui/material/Alert';

import React, { useState } from 'react';

type Props = {
    openUpdateThread: boolean;
    handleCloseUpdateThread: () => void;
    thread_page_id: number;
    API: string;
}

const UpdateThread: React.FC<Props> = ({API, openUpdateThread, handleCloseUpdateThread, thread_page_id}: Props) => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);
    
    const resetUpdateThread = () => {
        setTitle("");
        setBody("");
    }

    const handleSubmitUpdateThread = () => {
        let new_message: string[] = [];
        if (title === "" || body === "") {
            new_message.push("Fill in all fields");
        }
        if (new_message.length > 0) {
            setSeverity('error');
            setMessage(new_message);
        } else {
            fetch(API + "/thread_pages/" + thread_page_id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    title,
                    body,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("Changes saved!")
                        setMessage(new_message);
                        resetUpdateThread();
                        setTimeout(() => window.location.reload(), 1000);
                    } else {
                        setSeverity('error');
                        new_message.push("Some error occured");
                        setMessage(new_message);
                    }
                })
                .catch((error) => console.log(error.message));
        }
    }

    return (
        <Dialog open={openUpdateThread} onClose={handleCloseUpdateThread} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                <AlertUser severity={severity} message={message}/>
                <TextField
                    value={title}
                    autoFocus
                    type='text'
                    margin="normal"
                    label="Title"
                    fullWidth
                    variant="standard"
                    onChange={event => setTitle(event.target.value)}
                />
                <TextField
                    value={body}
                    type='text'
                    margin="normal"
                    label="Say something here..."
                    fullWidth
                    variant="standard"
                    multiline
                    onChange={event => setBody(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseUpdateThread}>Cancel</Button>
                <Button onClick={handleSubmitUpdateThread}>Edit Thread</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateThread;