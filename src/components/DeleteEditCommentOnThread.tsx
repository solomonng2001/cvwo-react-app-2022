import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import CreateComment from './CreateComment';
import DeleteThread from './DeleteThread';
import UpdateThread from './UpdateThread';
import CurrentUserState from '../types/CurrentUserState';
import {Thread} from '../types/Thread';
import GlobalMessageState from '../types/GlobalMessageState';

type Props = {
    commentable: boolean;
    thread: Thread;
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
};

const DeleteEditCommentOnThread: React.FC<Props> = ({ API, currentUserState, thread, globalMessageState }: Props) => {
    const [openCreateComment, setOpenCreateComment] = React.useState<boolean>(false);
    const handleClickOpenCreateComment = () => {
      if (currentUserState.isLoggedIn) {
        setOpenCreateComment(true);
      } else {
        globalMessageState.setSeverityGlobalMessage("info");
        globalMessageState.setGlobalMessage(["Please login to comment"]);
        globalMessageState.handleOpenGlobalMessage();
      }
    };
    const handleCloseCreateComment = () => {
      setOpenCreateComment(false);
    };

    const [openDeleteThread, setOpenDeleteThread] = React.useState<boolean>(false);
    const handleClickOpenDeleteThread = () => {
      setOpenDeleteThread(true);
    };
    const handleCloseDeleteThread = () => {
      setOpenDeleteThread(false);
    };

    const [openUpdateThread, setOpenUpdateThread] = React.useState<boolean>(false);
    const handleClickOpenUpdateThread = () => {
      setOpenUpdateThread(true);
    };
    const handleCloseUpdateThread = () => {
      setOpenUpdateThread(false);
    };
    
    return (
        <Stack direction="row" justifyContent='flex-end' alignItems="center" spacing={1}>
            <IconButton onClick={handleClickOpenCreateComment}>
                <CommentIcon />
            </IconButton>
            <CreateComment API={API} thread_page_id={thread.id} openCreateComment={openCreateComment} handleCloseCreateComment={handleCloseCreateComment} currentUserState={currentUserState}/>
            { thread.user_id === currentUserState.currentUser.id &&
              <>
                <IconButton onClick={handleClickOpenUpdateThread}>
                  <EditIcon />
                </IconButton>
                <UpdateThread API={API} thread_page_id={thread.id} openUpdateThread={openUpdateThread} handleCloseUpdateThread={handleCloseUpdateThread} />
              </>
            }
            { thread.user_id === currentUserState.currentUser.id &&
              <>
                <IconButton onClick={handleClickOpenDeleteThread}>
                  <DeleteIcon />
                </IconButton>
                <DeleteThread API={API} thread_page_id={thread.id} openDeleteThread={openDeleteThread} handleCloseDeleteThread={handleCloseDeleteThread} />
              </>
            }
        </Stack>
    );
};

export default DeleteEditCommentOnThread;