import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle, Grid, Chip} from '@material-ui/core';
import AlertUser from '../AlertUser';
import { AlertColor } from '@mui/material/Alert';
import { strToArray } from '../../actions/actions';
import CurrentUserState from '../../types/CurrentUserState';

import React, { useState, useEffect } from 'react';

type Props = {
    openCreateThread: boolean;
    handleCloseCreateThread: () => void;
    currentUserState: CurrentUserState;
    API: string;
}

// create thread dialog page
const CreateThread: React.FC<Props> = ({API, openCreateThread, handleCloseCreateThread, currentUserState }: Props) => {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [tagsInput, setTagsInput] = useState<string>(""); // tags string directly from user input
    const [tagsArray, setTagsArray] = useState<string[]>([]); // tags parsed into arrays
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [message, setMessage] = useState<string[]>([]);

    const resetCreateThread = () => {
        setTitle("");
        setBody("");
        setTagsInput("");
    }

    // whenver tagsInput string changed by user, update tagsArray
    useEffect(() => {
        setTagsArray(strToArray(tagsInput));
    }, [tagsInput]);

    // on clicking create button, post to backend
    const handleSubmitCreateThread = () => {
        const user_id = currentUserState.currentUser.id;
        // array as string equivalent in backend
        const tags = tagsArray.toString(); 
        // reset messages array, before adding error/success messages
        let new_message: string[] = []; 
        // reject empty fields (except tags)
        if (title === "" || body === "") { 
            new_message.push("Fill in all fields");
        }
        if (new_message.length > 0) {
            setSeverity('error');
            setMessage(new_message);
        } else {
            fetch(API + "/thread_pages", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    body,
                    user_id,
                    tags,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        setSeverity('success');
                        new_message.push("You have created a new thread!")
                        setMessage(new_message);
                        // empty fields (prevent duplicate creatiion) and refresh page
                        resetCreateThread();
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
    
    // dialog contains title, tags and body text fields, and "cancel" and "create thread" buttons
    return (
        <Dialog open={openCreateThread} onClose={handleCloseCreateThread} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                {/* display success/error messages */}
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
                    { tagsArray.length > 0 && tagsArray.map(tag =>
                        <Grid item>
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
                <Button onClick={handleCloseCreateThread}>Cancel</Button>
                <Button onClick={handleSubmitCreateThread}>Create Thread</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateThread;