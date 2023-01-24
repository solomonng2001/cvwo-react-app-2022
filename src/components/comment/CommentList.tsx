import CommentItem from './CommentItem';
import Comment from '../../types/Comment';
import CurrentUserState from '../../types/CurrentUserState';

import React from 'react';

type Props = {
    comments: Comment[];
    currentUserState: CurrentUserState;
    API: string;
}

// series of comments: each comment is a card displaying body text, edit and delete buttons, user and date and time
const CommentList: React.FC<Props> = ({API, comments, currentUserState}: Props) => {
    return (
        <ul>
            {comments.map(comment => (
                <CommentItem API={API} comment={comment} key={comment.id} currentUserState={currentUserState}/>
            ))}
        </ul>
    );
};

export default CommentList;
