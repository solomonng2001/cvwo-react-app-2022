import { Typography, Box, AppBar, Container, Toolbar, Tooltip,
  IconButton, Avatar, CardActionArea } from '@material-ui/core';
import ForumIcon from '@mui/icons-material/Forum';
import AccountSettings from './account/AccountSettings';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';
import Stack from '@mui/material/Stack';

import React from 'react';

type Props = {
  currentUserState: CurrentUserState;
  globalMessageState: GlobalMessageState;
  API: string;
}

// Navigation bar menu: contains home button, my threads button and account settings dropdown menu (accessible on all pages)
const NavBar: React.FC<Props> = ({API, currentUserState, globalMessageState}: Props) => {

  // Anchor settings menu (dropdown menu: contains log in, log out and creaete account buttons)
  const [anchorElAccountSettings, setAnchorElAccountSettings] = React.useState<null | HTMLElement>(null);
  const openAccountSettings = Boolean(anchorElAccountSettings);
  const handleClickAccountSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccountSettings(event.currentTarget);
  };
  const handleCloseAccountSettings = () => {
    setAnchorElAccountSettings(null);
  };

  // Other buttons on navbar that redirect to other pages (other than "home" and "account settings" buttons)
  type page = {
    pageName: string;
    href: string;
  }
  const myThreads: page = {
    pageName: "MyThreads",
    href: "/mythreads",
  }
  const pages:page[] = [myThreads];

  return (
    <Box marginBottom={'70px'}>
      <AppBar position='fixed' style={{zIndex: '1200'}}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box flexGrow={1} display='flex' alignItems={'center'}>
              {/* Logo and website name */}
              <ForumIcon sx={{mr: 1}} />
              <Typography variant='h6' component='a' href='/'
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  marginRight: '40px',
                }}
              >
                ChitChat
              </Typography>
              <Stack direction='row'>
                {/* Other buttons redirecting to other pages */}
                {currentUserState.isLoggedIn && pages.map(page => (
                  <CardActionArea key={page.pageName} style={{padding: '10px', borderRadius: '10px'}} href={page.href}>
                    <Typography>{page.pageName}</Typography>
                  </CardActionArea>
                ))}
              </Stack>
            </Box>
            {/* Account settings button with dropdown menu containing login, logout, change password and create account */}
            <Tooltip title="Account Settings">
              <IconButton
                id="basic-button"
                aria-controls={openAccountSettings ? 'account-settings' : undefined}
                aria-haspopup="true"
                aria-expanded={openAccountSettings ? 'true' : undefined}
                onClick={handleClickAccountSettings}
              >
                <Avatar/>
              </IconButton>
            </Tooltip>
            <AccountSettings API={API} anchorElAccountSettings={anchorElAccountSettings} openAccountSettings={openAccountSettings} 
              handleCloseAccountSettings={handleCloseAccountSettings} currentUserState={currentUserState} globalMessageState={globalMessageState}/>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;