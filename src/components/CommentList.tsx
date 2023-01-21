import CommentItem from './CommentItem';
import Comment from '../types/Comment';
import CurrentUserState from '../types/CurrentUserState';

import React from 'react';

type Props = {
    comments: Comment[];
    currentUserState: CurrentUserState;
    API: string;
}

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
