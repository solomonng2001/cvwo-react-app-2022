import ThreadList from '../components/ThreadList';
import { Typography } from '@material-ui/core';
import Typewriter from 'typewriter-effect';
import SearchBar from '../components/SearchBar';

import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center'}}>
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
                <SearchBar />
            <ThreadList />
        </div>
    );
};

export default Home;