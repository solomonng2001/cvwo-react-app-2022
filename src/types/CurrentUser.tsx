import React from 'react';

type CurrentUser = {
    id: number;
    username: string;
    password_digest: string;
    created_at: string;
    updated_at: string;
};

export default CurrentUser;