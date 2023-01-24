import { Thread, emptyThread } from '../../types/Thread';
import ThreadMainPost from './ThreadMainPost';
import CommentList from '../comment/CommentList';
import CurrentUserState from '../../types/CurrentUserState';
import GlobalMessageState from '../../types/GlobalMessageState';

import React, { useEffect, useState } from 'react';

type Props = {
    threadID: string | undefined;
    currentUserState: CurrentUserState;
    API: string,
    globalMessageState: GlobalMessageState;
}

// Page displaying individual thread and associated comments
const ThreadView: React.FC<Props> = ({threadID, currentUserState, API, globalMessageState}: Props) => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [thread, setThread] = useState<Thread>(emptyThread);

    // Fetch thread and associated comments when page loaded
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
    
    // Display "loading" until response from backend, then display error or threads and comments
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                {/* Individual thread: title, body, user, tags, and button icons to edit, delete or comment */}
                <ThreadMainPost globalMessageState={globalMessageState} API={API} toOverflow={false} thread={thread} key={thread.id} currentUserState={currentUserState}/>
                {/* all associated comments */}
                <CommentList API={API} comments={thread.comments} currentUserState={currentUserState}/>
            </>
        );
    }
};

export default ThreadView;
