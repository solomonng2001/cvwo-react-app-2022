import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from './AvatarUserTimeTags';
import DeleteEditComment from './DeleteEditComment';
import Thread from '../types/Thread';

type Props = {
    toOverflow: boolean;
    thread: Thread;
}

const ThreadPost: React.FC<Props> = ( {toOverflow, thread}: Props) => {
    return (
        <Card>
            <CardActionArea style={{ padding: '20px' }} href={'/thread/' + thread.id}>
                <Typography variant='h4' align='left'>
                    {thread.title}
                </Typography>
            </CardActionArea>
            <CardContent>
                <Stack direction='column' spacing={3}>
                    <AvatarUserTimeTags tagged={true} user={thread.user.user} time={new Date(thread.created_at)}/>
                    <Typography noWrap={toOverflow} align='left' variant="body1">
                        {thread.body}
                    </Typography>
                    <DeleteEditComment commentable={true}/>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ThreadPost;