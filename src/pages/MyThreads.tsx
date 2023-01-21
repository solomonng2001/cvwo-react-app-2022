import ThreadList from '../components/ThreadList';
import { Thread } from '../types/Thread';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

import React, {useState, useEffect} from 'react';

type Props = {
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

const MyThreads: React.FC<Props> = ( {currentUserState, API, globalMessageState}: Props) => {
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [threads, setThreads] = useState<Thread[]>([]);

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
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }
    }, [currentUserState.isLoggedIn, currentUserState.currentUser.id, API]);

    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center', paddingTop: '30px'}}>
            <ThreadList globalMessageState={globalMessageState} API={API} threads={threads} error={error} isLoaded={isLoaded} currentUserState={currentUserState}/>
        </div>
    );
};

export default MyThreads;