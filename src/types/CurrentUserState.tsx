import React from 'react';
import CurrentUser from './CurrentUser';

type CurrentUserState = {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
    emptyCurrentUser: CurrentUser;
    isLoggedIn: boolean;
}

export default CurrentUserState;