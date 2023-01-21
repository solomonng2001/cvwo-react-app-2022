import Comment from '../types/Comment';
import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from './AvatarUserTimeTags';
import DeleteEditOnComment from './DeleteEditOnComment';
import BodyAddHTML from './BodyAddHTML';
import CurrentUserState from '../types/CurrentUserState';

type Props = {
    comment: Comment;
    currentUserState: CurrentUserState;
    API: string;
};

const useStyles = makeStyles({
    commentBody: {
        fontSize: 16,
        whiteSpace: 'pre-wrap',
        paddingBottom: '1em',
    },
    commentCard: {
        marginBottom: '1em',
    },
    metadata: {
        fontSize: 14,
    },
});

const CommentItem: React.FC<Props> = ({ API, comment, currentUserState }: Props) => {
    const classes = useStyles();
        return (
            <Card className={classes.commentCard}>
                <CardContent>
                    <Stack direction='column' spacing={3}>
                        <AvatarUserTimeTags tagged={false} user={comment.user.username} time={new Date(comment.created_at)} tags={""}/>
                        <BodyAddHTML body={comment.body} toOverflow={false}/>
                        <DeleteEditOnComment API={API} comment={comment} currentUserState={currentUserState}/>
                    </Stack>
                </CardContent>
            </Card>
        );
};

export default CommentItem;
