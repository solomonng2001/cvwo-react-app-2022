import ThreadView from '../components/ThreadView';
import SearchBar from '../components/SearchBar';
import { useParams } from "react-router-dom";

import React from 'react';

const ThreadPage: React.FC = () => {
    let { threadID }  = useParams();
    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center' }}>
            <SearchBar />
            <ThreadView threadID={threadID}/>
        </div>
    );
};

export default ThreadPage;
