import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import DeleteComment from './DeleteComment';
import Comment from '../types/Comment';
import UpdateComment from './UpdateComment';
import CurrentUserState from '../types/CurrentUserState';

type Props = {
    comment: Comment;
    currentUserState: CurrentUserState;
    API: string;
}

const DeleteEditOnComment: React.FC<Props> = ({API, comment, currentUserState}: Props) => {
    const [openDeleteComment, setOpenDeleteComment] = React.useState<boolean>(false);
    const handleClickOpenDeleteComment = () => {
      setOpenDeleteComment(true);
    };
    const handleCloseDeleteComment = () => {
      setOpenDeleteComment(false);
    };

    const [openUpdateComment, setOpenUpdateComment] = React.useState<boolean>(false);
    const handleClickOpenUpdateComment = () => {
      setOpenUpdateComment(true);
    };
    const handleCloseUpdateComment = () => {
      setOpenUpdateComment(false);
    };
    
    return (
        <Stack direction="row" justifyContent='flex-end' alignItems="center" spacing={1}>
          { comment.user_id === currentUserState.currentUser.id &&
            <>
              <IconButton onClick={handleClickOpenUpdateComment}>
                  <EditIcon />
              </IconButton>
              <UpdateComment API={API} comment={comment} openUpdateComment={openUpdateComment} handleCloseUpdateComment={handleCloseUpdateComment} />
            </>
          }
          { comment.user_id === currentUserState.currentUser.id &&
            <>
              <IconButton onClick={handleClickOpenDeleteComment}>
                <DeleteIcon />
              </IconButton>
              <DeleteComment API={API} comment={comment} openDeleteComment={openDeleteComment} handleCloseDeleteComment={handleCloseDeleteComment} />
            </>
          }
        </Stack>
    );
};

export default DeleteEditOnComment;