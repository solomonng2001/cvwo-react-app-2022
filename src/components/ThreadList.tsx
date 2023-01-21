import '../App.css';
import ThreadMainPost from './ThreadMainPost';
import Stack from '@mui/material/Stack';
import { Thread } from '../types/Thread';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

import React from 'react';

type Props = {
    threads: Thread[];
    currentUserState: CurrentUserState;
    error: any;
    isLoaded: boolean;
    API: string;
    globalMessageState: GlobalMessageState;
}

const ThreadList: React.FC<Props> = ({ API, threads, error, isLoaded, currentUserState, globalMessageState }: Props) => {
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={{ width: '50vw', margin: 'auto', textAlign: 'center' }}>
                <Stack spacing={2}>
                    { threads.map(thread => (
                        <ThreadMainPost globalMessageState={globalMessageState} API={API} toOverflow={true} thread={thread} key={thread.id} currentUserState={currentUserState}/>
                    ))}
                </Stack>
            </div>
        );
    }
};

export default ThreadList;
