import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import CreateComment from './CreateComment';

type Props = {
    commentable: boolean;
};

const DeleteEditComment: React.FC<Props> = ({ commentable }: Props) => {
    const [openCreateComment, setOpenCreateComment] = React.useState<boolean>(false);

    const handleClickOpenCreateComment = () => {
      setOpenCreateComment(true);
    };
  
    const handleCloseCreateComment = () => {
      setOpenCreateComment(false);
    };
    
    return (
        <Stack direction="row" justifyContent='flex-end' alignItems="center" spacing={1}>
            { commentable &&
                <>
                    <IconButton>
                        <CommentIcon onClick={handleClickOpenCreateComment}/>
                    </IconButton>
                    <CreateComment openCreateComment={openCreateComment} handleCloseCreateComment={handleCloseCreateComment} />
                </>
            }
            <IconButton>
                <EditIcon />
            </IconButton>
            <IconButton>
                <DeleteIcon />
            </IconButton>
        </Stack>
    );
};

export default DeleteEditComment;