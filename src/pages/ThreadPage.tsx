import ThreadView from '../components/ThreadView';
import { useParams } from "react-router-dom";
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

import React from 'react';

type Props = {
    currentUserState: CurrentUserState,
    API: string,
    globalMessageState: GlobalMessageState
}

const ThreadPage: React.FC<Props> = ({currentUserState, API, globalMessageState}: Props) => {
    let { threadID }  = useParams();
    return (
        <div style={{ width: '50vw', margin: 'auto', textAlign: 'center', paddingTop: "30px" }}>
            <ThreadView globalMessageState={globalMessageState} threadID={threadID} currentUserState={currentUserState} API={API}/>
        </div>
    );
};

export default ThreadPage;
