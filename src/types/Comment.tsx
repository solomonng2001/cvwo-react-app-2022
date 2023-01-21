import React from 'react';
import User from './User';

type Comment = {
    id: number;
    body: string;
    thread_page_id: number;
    user_id: 2,
    created_at: string;
    updated_at: string;
    user: User;
};

export default Comment;
