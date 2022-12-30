import Thread from '../types/Thread';
import ThreadMainPost from './ThreadMainPost';
import CommentList from './CommentList';

import React, { useEffect, useState } from 'react';

type Props = {
    threadID: string | undefined;
}

const ThreadView: React.FC<Props> = ({threadID}: Props) => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [thread, setThread] = useState<Thread>({
        id: 0,
        title: '',
        body: '',
        user_id: 0,
        created_at: '',
        updated_at: '',
        comments: [],
        user: {
            user: '',
        },
    });

    useEffect(() => {
        fetch("http://localhost:3000/thread_pages/" + threadID, {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setThread(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <ThreadMainPost toOverflow={false} thread={thread} key={thread.id}/>
                <CommentList comments={thread.comments}/>
            </>
        );
    }
};

export default ThreadView;
