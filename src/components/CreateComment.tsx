import { Button, TextField, Dialog, DialogActions, DialogContent, 
    DialogTitle} from '@material-ui/core';

import React from 'react';

type Props = {
    openCreateComment: boolean;
    handleCloseCreateComment: () => void;
}

const CreateComment: React.FC<Props> = ({openCreateComment, handleCloseCreateComment}: Props) => {
    return (
        <Dialog open={openCreateComment} onClose={handleCloseCreateComment} fullWidth>
            <DialogTitle>What's on your mind?</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    type='text'
                    margin="normal"
                    label="Say something here..."
                    fullWidth
                    variant="standard"
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateComment}>Cancel</Button>
                <Button onClick={handleCloseCreateComment}>Comment</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateComment;