import CommentItem from './CommentItem';
import Comment from '../types/Comment';

import React from 'react';

type Props = {
    comments: Comment[];
}

const CommentList: React.FC<Props> = ({comments}: Props) => {
    return (
        <ul>
            {comments.map(comment => (
                <CommentItem comment={comment} key={comment.id} />
            ))}
        </ul>
    );
};

export default CommentList;
