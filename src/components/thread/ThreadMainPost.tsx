import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from '../AvatarUserTimeTags';
import DeleteEditCommentOnThread from './DeleteEditCommentOnThread';
import { Thread } from '../../types/Thread';
import BodyAddHTML from '../BodyAddHTML';
import CurrentUserState from '../../types/CurrentUserState';
import GlobalMessageState from '../../types/GlobalMessageState';

type Props = {
    toOverflow: boolean;
    thread: Thread;
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

// display individual thread: title, body, user, tags, and button icons to edit, delete or comment
const ThreadPost: React.FC<Props> = ( {API, toOverflow, thread, currentUserState, globalMessageState}: Props) => {
    return (
        // Clickable title: redirect to individual thread page (expecially on home page, where threads have text-oveflow and comments are hidden)
        <Card>
            <CardActionArea style={{ padding: '20px' }} href={'/thread/' + thread.id}>
                <Typography variant='h4' align='left'>
                    {thread.title}
                </Typography>
            </CardActionArea>
            <CardContent>
                <Stack direction='column' spacing={3}>
                    {/* Section of thread displaying creator, date and time, and tags */}
                    <AvatarUserTimeTags tagged={true} user={thread.user.username} time={new Date(thread.created_at)} tags={thread.tags}/>
                    {/* Body text with html properties handled */}
                    <BodyAddHTML body={thread.body} toOverflow={toOverflow} />
                    {/* Button icons for deleting, editing and commenting */}
                    <DeleteEditCommentOnThread globalMessageState={globalMessageState} API={API} commentable={true} thread={thread} currentUserState={currentUserState}/>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ThreadPost;