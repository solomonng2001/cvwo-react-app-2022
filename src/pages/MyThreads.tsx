import ThreadList from '../components/thread/ThreadList';
import { Thread } from '../types/Thread';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';
import { Typography } from '@material-ui/core';

import React, {useState, useEffect} from 'react';

type Props = {
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

// MyThreads page: display threads created by current user (must be logged in)
const MyThreads: React.FC<Props> = ( {currentUserState, API, globalMessageState}: Props) => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [threads, setThreads] = useState<Thread[]>([]);

    // If current user is logged in, fetch user's created threads
    useEffect(() => {
        if (currentUserState.isLoggedIn) {
            fetch(API + "/mythreads/" + currentUserState.currentUser.id, {
                method: 'GET',
                mode: 'cors'
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setThreads(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [currentUserState.isLoggedIn, currentUserState.currentUser.id, API]);

    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center', paddingTop: '30px'}}>
            {/* List user's threads using ThreadList element (abtraction) */}
            { threads.length === 0 ?
                <Typography variant="h6">Opps! Looking empty... Go ahead and create your first thread!</Typography> :
                <ThreadList globalMessageState={globalMessageState} API={API} threads={threads} error={error} isLoaded={isLoaded} currentUserState={currentUserState}/>
            }
        </div>
    );
};

export default MyThreads;