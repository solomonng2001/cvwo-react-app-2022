import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, Chip } from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import { strToArray, arrayStrToStr } from '../../actions/actions';
import { Thread } from '../../types/Thread';

import React, { useState, useEffect } from 'react';

type Props = {
    openUpdateThread: boolean;
    handleCloseUpdateThread: () => void;
    thread: Thread;
    API: string;
}

// Edit thread dialog (must be creator of thread and logged in)
const UpdateThread: React.FC<Props> = ({API, openUpdateThread, handleCloseUpdateThread, thread}: Props) => {
    const [title, setTitle] = useState<string>(thread.title);
    const [body, setBody] = useState<string>(thread.body);
    const [tagsInput, setTagsInput] = useState<string>(arrayStrToStr(thread.tags)); // tags string directly from user input
    const [tagsArray, setTagsArray] = useState<string[]>([]); // tags parsed into arrays
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetUpdateThread = () => {
        setTitle("");
        setBody("");
        setTagsInput("");
    }

    // whenver tagsInput string changed by user, update tagsArray
    useEffect(() => {
        setTagsArray(strToArray(tagsInput));
    }, [tagsInput]);

    // On clicking submit button, patch changes to backend
    const handleSubmitUpdateThread = () => {

        // empty message array, before adding error/success messages
        let new_message: string[] = [];

        // array as string equivalent in backend
        const tags = tagsArray.toString(); 

        // check that all fields are not empty
        if (title === "" || body === "") {
            new_message.push("Fill in all fields");
        }
        if (new_message.length > 0) {
            setSeverity('error');
            setMessage(new_message);
        } else {
            fetch(API + "/thread_pages/" + thread.id, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    title,
                    body,
                    tags,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("Changes saved!")
                        setMessage(new_message);

                        // Empty all fields (prevent resubmission) and refresh page
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

    // Dialog page contains "title" and "body" text fields, and "close" and "edit thread" (submit changes) buttons
    return (
        <Dialog open={openUpdateThread} onClose={handleCloseUpdateThread} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                {/* Display success/error messages */}
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
                {/* textfield that accepts tags input */}
                <TextField
                    value={tagsInput}
                    type='text'
                    margin="normal"
                    label="Tags"
                    fullWidth
                    placeholder='#HawkerFood #Travel #School'
                    variant="standard"
                    onChange={event => setTagsInput(event.target.value)}
                />
                {/* display tags for user to view how tags will look like on thread */}
                <Grid container direction='row' spacing={1} justifyContent='flex-start' alignItems='flex-start'>
                    { tagsArray.length > 0 && tagsArray.map((tag, index) =>
                        <Grid item key={index}>
                            <Chip label={tag}/>
                        </Grid>
                    )}
                </Grid>
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