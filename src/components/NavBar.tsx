import { Typography, Box, AppBar, Container, Toolbar, CardActionArea, Tooltip,
  IconButton, Avatar } from '@material-ui/core';
import ForumIcon from '@mui/icons-material/Forum';
import Stack from '@mui/material/Stack';
import AccountSettings from './AccountSettings';

import React from 'react';

const pages = ['MyThreads', 'MyComments']
const settings = ['Profile', 'Account', 'Logout', 'Sign In'];

const NavBar: React.FC = () => {
  const [anchorElAccountSettings, setAnchorElAccountSettings] = React.useState<null | HTMLElement>(null);
  const openAccountSettings = Boolean(anchorElAccountSettings);
  const handleClickAccountSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAccountSettings(event.currentTarget);
  };
  const handleCloseAccountSettings = () => {
    setAnchorElAccountSettings(null);
  };

  return (
    <Box marginBottom={'70px'}>
      <AppBar position='fixed' style={{zIndex: '1200'}}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box flexGrow={1} display='flex' alignItems={'center'}>
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
                {pages.map(page => (
                  <CardActionArea key={page} style={{padding: '10px', borderRadius: '10px'}} href='/'>
                    <Typography>{page}</Typography>
                  </CardActionArea>
                ))}
              </Stack>
            </Box>
            <Tooltip title="Account Settings">
              <IconButton
                id="basic-button"
                aria-controls={openAccountSettings ? 'account-settings' : undefined}
                aria-haspopup="true"
                aria-expanded={openAccountSettings ? 'true' : undefined}
                onClick={handleClickAccountSettings}
              >
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <AccountSettings anchorElAccountSettings={anchorElAccountSettings} openAccountSettings={openAccountSettings} handleCloseAccountSettings={handleCloseAccountSettings} />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;