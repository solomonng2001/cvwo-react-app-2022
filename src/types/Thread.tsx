import Comment from './Comment';
import User from './User';

type Thread = {
    id: number;
    title: string;
    body: string;
    user_id: number;
    tags: string;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    user: User;
};

const emptyThread: Thread = {
    id: 0,
    title: '',
    body: '',
    user_id: 0,
    tags: "",
    created_at: '',
    updated_at: '',
    comments: [],
    user: {
        username: '',
    },
}

export { type Thread, emptyThread };