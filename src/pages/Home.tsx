import ThreadList from '../components/ThreadList';
import { Typography } from '@material-ui/core';
import Typewriter from 'typewriter-effect';
import SearchBar from '../components/SearchBar';
import { Thread } from '../types/Thread';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

import React, {useState, useEffect} from 'react';

type Props = {
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

// Root path directs to homepage
const Home: React.FC<Props> = ( {currentUserState, API, globalMessageState}: Props) => {
    const [threadResults, setThreadResults] = useState<Thread[]>([]);
    const [error, setError] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [threads, setThreads] = useState<Thread[]>(threadResults);

    // get json of latest threads from server
    useEffect(() => {
        if (threadResults.length > 0) {
            setIsLoaded(true);
            setThreads(threadResults);
        } else {
            fetch(API + "/thread_pages", {
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
    }, [threadResults, API]);

    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center'}}>

            {/* ChitChat animiation */}
            <Typography variant='h3' style={{ paddingTop: '70px'}}>
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(80)
                            .typeString("ChitChat")
                            .pauseFor(1000)
                            .start();
                    }}
                /> 
            </Typography>

            {/* Search Bar: search by tags or title */}
            <SearchBar setThreadResults={setThreadResults} currentUserState={currentUserState} API={API}
                globalMessageState={globalMessageState}/>

            {/* List of threads, starting from latest */}
            <ThreadList globalMessageState={globalMessageState} API={API} threads={threads} currentUserState={currentUserState}
                error={error} isLoaded={isLoaded}/>
        </div>
    );
};

export default Home;