import React from 'react';

type Thread = {
    id: number;
    title: string;
    body: string;
    user_id: number;
    tags: string;
    created_at: string;
    updated_at: string;
};

export default Thread;