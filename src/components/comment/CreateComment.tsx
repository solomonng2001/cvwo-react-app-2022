import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import CurrentUserState from '../../types/CurrentUserState';

import React, { useState } from 'react';

type Props = {
    openCreateComment: boolean;
    handleCloseCreateComment: () => void;
    thread_page_id: number;
    currentUserState: CurrentUserState;
    API: string;
}

// create comment dialog page
const CreateComment: React.FC<Props> = ({API, openCreateComment, handleCloseCreateComment, thread_page_id, currentUserState}: Props) => {
    const [body, setBody] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetCreateComment = () => {
        setBody("");
    }
    
    // on clicking create button, post to backend
    const handleSubmitCreateComment = () => {
        const user_id = currentUserState.currentUser.id
        // reset message array, before adding messages
        let new_message: string[] = []; 
        // reject empty fields
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
                        // empty fields (prevent creation of duplicate comments) and refresh page
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

    // dialog containing body text, and "close" and "create comment" buttons
    return (
        <Dialog open={openCreateComment} onClose={handleCloseCreateComment} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                {/* display success/error messages */}
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