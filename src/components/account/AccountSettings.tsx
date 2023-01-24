import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogIn from './LogIn';
import CreateAccount from './CreateAccount';
import CurrentUserState from '../../types/CurrentUserState';
import GlobalMessageState from '../../types/GlobalMessageState';
import ChangePassword from './ChangePassword';

// Sourced Menu component from https://mui.com/material-ui/react-menu/#main-content and modified for use

type Props = {
    anchorElAccountSettings: HTMLElement | null,
    openAccountSettings: boolean,
    handleCloseAccountSettings: () => void,
    currentUserState: CurrentUserState;
    globalMessageState: GlobalMessageState;
    API: string;
}

// account settings button with dropdown menu containing more settings
const AccountSettings: React.FC<Props> = ({API, anchorElAccountSettings, openAccountSettings, handleCloseAccountSettings, currentUserState, globalMessageState}: Props) => {
  
  // toggle close/open login dialog page
  const [openLogIn, setOpenLogIn] = React.useState<boolean>(false);
    const handleClickOpenLogIn = () => {
      setOpenLogIn(true);
    };
    const handleCloseLogIn = () => {
      setOpenLogIn(false);
    };

    // toggle close/open create account dialog page
    const [openCreateAccount, setOpenCreateAccount] = React.useState<boolean>(false);
    const handleClickOpenCreateAccount = () => {
      setOpenCreateAccount(true);
    };
    const handleCloseCreateAccount = () => {
      setOpenCreateAccount(false);
    };

    // toggle close/open change password dialog page
    const [openChangePassword, setOpenChangePassword] = React.useState<boolean>(false);
    const handleClickOpenChangePassword = () => {
      setOpenChangePassword(true);
    };
    const handleCloseChangePassword = () => {
      setOpenChangePassword(false);
    };

    // when logout, forget user cache: user info and jwt token
    const handleLogOut = () => {
      currentUserState.setCurrentUser(currentUserState.emptyCurrentUser);
      localStorage.removeItem("token");
      window.location.reload(); // refresh page to update without any user logged in
    }

    return (
        <div>
          {/* if user logged in, display change password and logout in dropdown menu */}
          { currentUserState.isLoggedIn ? 
            <Menu
                id="account-settings"
                anchorEl={anchorElAccountSettings}
                open={openAccountSettings}
                onClose={handleCloseAccountSettings}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >            
              <MenuItem onClick={handleClickOpenChangePassword}>Change Password</MenuItem>
              <ChangePassword API={API} openChangePassword={openChangePassword} handleCloseChangePassword={handleCloseChangePassword} currentUserState={currentUserState}/>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu> :
            // else if user not logged in, display create account and login in dropdown menu
            <Menu
              id="account-settings"
              anchorEl={anchorElAccountSettings}
              open={openAccountSettings}
              onClose={handleCloseAccountSettings}
              MenuListProps={{
              'aria-labelledby': 'basic-button',
              }}
            >            
              <MenuItem onClick={handleClickOpenLogIn}>Log In</MenuItem>
              <LogIn API={API} openLogIn={openLogIn} handleCloseLogIn={handleCloseLogIn} currentUserState={currentUserState} globalMessageState={globalMessageState}/>
              <MenuItem onClick={handleClickOpenCreateAccount}>Create Account</MenuItem>
              <CreateAccount API={API} openCreateAccount={openCreateAccount} handleCloseCreateAccount={handleCloseCreateAccount}/>
            </Menu>
              }
        </div>
    );
};

export default AccountSettings;