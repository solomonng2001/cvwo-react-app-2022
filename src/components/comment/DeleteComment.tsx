import { Button, Dialog, DialogActions, DialogContent, 
    DialogTitle } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import Comment from '../../types/Comment';

import React, { useState } from 'react';

type Props = {
    openDeleteComment: boolean;
    handleCloseDeleteComment: () => void;
    comment: Comment;
    API: string;
}

// Delete comment dialog page
const DeleteComment: React.FC<Props> = ({API, openDeleteComment, handleCloseDeleteComment, comment}: Props) => {
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);
    
    // on clicking delete comment button, delete in backend
    const handleSubmitDeleteComment = () => {
        let new_message: string[] = [];
        fetch(API + "/thread_pages/" + comment.thread_page_id.toString() + "/comments/" + comment.id.toString(), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                },
        })
            .then((response) => {
                if (response.ok) {
                    setSeverity('success');
                    new_message.push("You have deleted comment!")
                    setMessage(new_message);

                    // reload page after short delay (prevent user from deleting comment again)
                    setTimeout(() => window.location.reload(), 1000);
                } else {
                    setSeverity('error');
                    new_message.push("Some error occured");
                    setMessage(new_message);
                }
            })
            .catch((error) => console.log(error.message));
    }

    // dialog contains "cancel" and "delete comment" buttons
    return (
        <Dialog open={openDeleteComment} onClose={handleCloseDeleteComment} fullWidth>
            <DialogTitle>Are you sure you want to delete this comment?</DialogTitle>
            <DialogContent>
                {/* display success/error messages */}
                <AlertUser severity={severity} message={message}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDeleteComment}>Cancel</Button>
                <Button onClick={handleSubmitDeleteComment}>Delete Comment</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteComment;