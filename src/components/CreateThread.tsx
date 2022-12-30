import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle} from '@material-ui/core';

import React from 'react';

type Props = {
    openCreateThread: boolean;
    handleCloseCreateThread: () => void;
}

const CreateThread: React.FC<Props> = ({openCreateThread, handleCloseCreateThread}: Props) => {
    return (
        <Dialog open={openCreateThread} onClose={handleCloseCreateThread} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    type='text'
                    margin="normal"
                    label="Title"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    type='text'
                    margin="normal"
                    label="Say something here..."
                    fullWidth
                    variant="standard"
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateThread}>Cancel</Button>
                <Button onClick={handleCloseCreateThread}>Create Thread</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateThread;