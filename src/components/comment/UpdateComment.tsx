import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle} from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import Comment from '../../types/Comment';

import React, { useState } from 'react';

type Props = {
    openUpdateComment: boolean;
    handleCloseUpdateComment: () => void;
    comment: Comment;
    API: string;
}

// Edit comment dialog (visible by creator and when creator is logged in)
const UpdateComment: React.FC<Props> = ({API, openUpdateComment, handleCloseUpdateComment, comment}: Props) => {
    const [body, setBody] = useState<string>(comment.body);
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);
    
    const resetUpdateComment = () => {
        setBody("");
    }

    // On clicking "edit comment" button, patch changes to backend
    const handleSubmitUpdateComment = () => {

        // Empty message array, before adding error/success messages
        let new_message: string[] = [];

        // Reject empty fields
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

                        // Empty all fields (prevent resubmissions) and refresh page
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

    // Dialog page contains "body" text field, and "cancel" and "edit comment" (submit changes) buttons
    return (
        <Dialog open={openUpdateComment} onClose={handleCloseUpdateComment} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                {/* Display success/error messages */}
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
                <Button onClick={handleSubmitUpdateComment}>Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateComment;