import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from './AvatarUserTimeTags';
import DeleteEditCommentOnThread from './DeleteEditCommentOnThread';
import { Thread } from '../types/Thread';
import BodyAddHTML from './BodyAddHTML';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

type Props = {
    toOverflow: boolean;
    thread: Thread;
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

const ThreadPost: React.FC<Props> = ( {API, toOverflow, thread, currentUserState, globalMessageState}: Props) => {
    return (
        <Card>
            <CardActionArea style={{ padding: '20px' }} href={'/thread/' + thread.id}>
                <Typography variant='h4' align='left'>
                    {thread.title}
                </Typography>
            </CardActionArea>
            <CardContent>
                <Stack direction='column' spacing={3}>
                    <AvatarUserTimeTags tagged={true} user={thread.user.username} time={new Date(thread.created_at)} tags={thread.tags}/>
                    <BodyAddHTML body={thread.body} toOverflow={toOverflow} />
                    <DeleteEditCommentOnThread globalMessageState={globalMessageState} API={API} commentable={true} thread={thread} currentUserState={currentUserState}/>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ThreadPost;