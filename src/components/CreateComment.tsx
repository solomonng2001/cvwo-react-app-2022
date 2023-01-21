import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle } from '@material-ui/core';
import AlertUser from './AlertUser';
import { AlertColor } from '@mui/material/Alert';
import CurrentUserState from '../types/CurrentUserState';

import React, { useState } from 'react';

type Props = {
    openCreateComment: boolean;
    handleCloseCreateComment: () => void;
    thread_page_id: number;
    currentUserState: CurrentUserState;
    API: string;
}

const CreateComment: React.FC<Props> = ({API, openCreateComment, handleCloseCreateComment, thread_page_id, currentUserState}: Props) => {
    const [body, setBody] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetCreateComment = () => {
        setBody("");
    }
    
    const handleSubmitCreateComment = () => {
        const user_id = currentUserState.currentUser.id
        let new_message: string[] = [];
        if (body === "") {
            new_message.push("Fill in all fields");
        }
        if (new_message.length > 0) {
            setSeverity('error');
            setMessage(new_message);
        } else {
            fetch(API + "/thread_pages/" + thread_page_id.toString() + "/comments", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    body,
                    user_id,
                    thread_page_id,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("You have created a new comment!")
                        setMessage(new_message);
                        resetCreateComment();
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
        <Dialog open={openCreateComment} onClose={handleCloseCreateComment} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                <AlertUser severity={severity} message={message}/>
                <TextField
                    value = {body}
                    autoFocus
                    type='text'
                    margin="normal"
                    label="Say something here..."
                    fullWidth
                    variant="standard"
                    multiline
                    onChange={(event) => setBody(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateComment}>Cancel</Button>
                <Button onClick={handleSubmitCreateComment}>Comment</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateComment;