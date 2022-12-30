import Comment from '../types/Comment';
import React from 'react';
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import AvatarUserTimeTags from './AvatarUserTimeTags';
import DeleteEditComment from './DeleteEditComment';

type Props = {
    comment: Comment;
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

const CommentItem: React.FC<Props> = ({ comment }: Props) => {
    const classes = useStyles();
        return (
            <Card className={classes.commentCard}>
                <CardContent>
                    <Stack direction='column' spacing={3}>
                        <AvatarUserTimeTags tagged={false} user={"user"} time={new Date(comment.created_at)}/>
                        <Typography align='left' variant="body1">            
                            {comment.body}
                        </Typography>
                        <DeleteEditComment commentable={false} />
                    </Stack>
                </CardContent>
            </Card>
        );
};

export default CommentItem;
