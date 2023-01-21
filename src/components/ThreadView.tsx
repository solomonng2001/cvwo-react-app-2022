import { Thread, emptyThread } from '../types/Thread';
import ThreadMainPost from './ThreadMainPost';
import CommentList from './CommentList';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

import React, { useEffect, useState } from 'react';

type Props = {
    threadID: string | undefined;
    currentUserState: CurrentUserState;
    API: string,
    globalMessageState: GlobalMessageState;
}

const ThreadView: React.FC<Props> = ({threadID, currentUserState, API, globalMessageState}: Props) => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [thread, setThread] = useState<Thread>(emptyThread);

    useEffect(() => {
        fetch(API + "/thread_pages/" + threadID, {
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
    }, [threadID, API])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <ThreadMainPost globalMessageState={globalMessageState} API={API} toOverflow={false} thread={thread} key={thread.id} currentUserState={currentUserState}/>
                <CommentList API={API} comments={thread.comments} currentUserState={currentUserState}/>
            </>
        );
    }
};

export default ThreadView;
