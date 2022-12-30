import React from 'react';
import Comment from './Comment';
import user from './User';

type Thread = {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    user: user;
};

export default Thread;