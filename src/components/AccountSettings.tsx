import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogIn from './LogIn';
import CreateAccount from './CreateAccount';

// Sourced Menu component from https://mui.com/material-ui/react-menu/#main-content and modified for use

type Props = {
    anchorElAccountSettings: HTMLElement | null,
    openAccountSettings: boolean,
    handleCloseAccountSettings: () => void,
}

const AccountSettings: React.FC<Props> = ({anchorElAccountSettings, openAccountSettings, handleCloseAccountSettings}: Props) => {
    const [openLogIn, setOpenLogIn] = React.useState<boolean>(false);
    const handleClickOpenLogIn = () => {
      setOpenLogIn(true);
    };
    const handleCloseLogIn = () => {
      setOpenLogIn(false);
    };

    const [openCreateAccount, setOpenCreateAccount] = React.useState<boolean>(false);
    const handleClickOpenCreateAccount = () => {
      setOpenCreateAccount(true);
    };
    const handleCloseCreateAccount = () => {
      setOpenCreateAccount(false);
    };

    return (
        <div>
        <Menu
            id="account-settings"
            anchorEl={anchorElAccountSettings}
            open={openAccountSettings}
            onClose={handleCloseAccountSettings}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleCloseAccountSettings}>Change Username</MenuItem>
            <MenuItem onClick={handleCloseAccountSettings}>Change Password</MenuItem>
            <MenuItem onClick={handleCloseAccountSettings}>Log Out</MenuItem>
            <MenuItem onClick={handleClickOpenLogIn}>Log In</MenuItem>
            <LogIn openLogIn={openLogIn} handleCloseLogIn={handleCloseLogIn}/>
            <MenuItem onClick={handleClickOpenCreateAccount}>Create Account</MenuItem>
            <CreateAccount openCreateAccount={openCreateAccount} handleCloseCreateAccount={handleCloseCreateAccount}/>
        </Menu>
        </div>
    );
};

export default AccountSettings;