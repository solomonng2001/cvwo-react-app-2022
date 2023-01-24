import Comment from '../../types/Comment';
import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from '../AvatarUserTimeTags';
import DeleteEditOnComment from './DeleteEditOnComment';
import BodyAddHTML from '../BodyAddHTML';
import CurrentUserState from '../../types/CurrentUserState';

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

// comment card
const CommentItem: React.FC<Props> = ({ API, comment, currentUserState }: Props) => {
    const classes = useStyles();
        return (
            <Card className={classes.commentCard}>
                <CardContent>
                    <Stack direction='column' spacing={3}>
                        {/* user, date and time (tags disabled for comments, since only threads have tags, but both use the same abstracted element) */}
                        <AvatarUserTimeTags tagged={false} user={comment.user.username} time={new Date(comment.created_at)} tags={""}/>
                        {/* body text with html properties handled by a parser */}
                        <BodyAddHTML body={comment.body} toOverflow={false}/>
                        {/* delete and edit buttons: clickable only for creators that are logged in */}
                        <DeleteEditOnComment API={API} comment={comment} currentUserState={currentUserState}/>
                    </Stack>
                </CardContent>
            </Card>
        );
};

export default CommentItem;
