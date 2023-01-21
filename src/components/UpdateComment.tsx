import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle} from '@material-ui/core';
import AlertUser from './AlertUser';
import { AlertColor } from '@mui/material/Alert';
import Comment from '../types/Comment';

import React, { useState } from 'react';

type Props = {
    openUpdateComment: boolean;
    handleCloseUpdateComment: () => void;
    comment: Comment;
    API: string;
}

const UpdateComment: React.FC<Props> = ({API, openUpdateComment, handleCloseUpdateComment, comment}: Props) => {
    const [body, setBody] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);
    
    const resetUpdateComment = () => {
        setBody("");
    }

    const handleSubmitUpdateComment = () => {
        let new_message: string[] = [];
        if (body === "") {
            new_message.push("Fill in all fields");
        }
        if (new_message.length > 0) {
            setSeverity('error');
            setMessage(new_message);
        } else {
            fetch(API + "/thread_pages/" + comment.thread_page_id + "/comments/" + comment.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    body,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("Changes saved!")
                        setMessage(new_message);
                        resetUpdateComment();
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
        <Dialog open={openUpdateComment} onClose={handleCloseUpdateComment} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                <AlertUser severity={severity} message={message}/>
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
                <Button onClick={handleCloseUpdateComment}>Cancel</Button>
                <Button onClick={handleSubmitUpdateComment}>Edit Comment</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateComment;