import '../App.css';
import ThreadMainPost from './ThreadMainPost';
import Stack from '@mui/material/Stack';
import Thread from '../types/Thread';

import React, { useEffect, useState } from 'react';

const ThreadList: React.FC = () => {

    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/thread_pages", {
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
    }, [])
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={{ width: '50vw', margin: 'auto', textAlign: 'center' }}>
                <Stack spacing={2}>
                    { threads.map(thread => (
                        <ThreadMainPost toOverflow={true} thread={thread} key={thread.id}/>
                    )) }
                </Stack>
            </div>
        );
    }
};

export default ThreadList;
