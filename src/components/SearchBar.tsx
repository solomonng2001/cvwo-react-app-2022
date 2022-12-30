import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CreateThread from './CreateThread';

const SearchBar: React.FC = () => {
    const [openCreateThread, setOpenCreateThread] = React.useState<boolean>(false);

    const handleClickOpenCreateThread = () => {
      setOpenCreateThread(true);
    };
  
    const handleCloseCreateThread = () => {
      setOpenCreateThread(false);
    };

    return (
        <div style={{paddingTop: '20px', paddingBottom: '20px', position: 'sticky', top: '50px', zIndex: '1100'}}>
            <Paper
            component="form" 
            sx={{ display: 'flex', alignItems: 'center' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Who's chatting about what?"
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleClickOpenCreateThread}>
                    <LibraryAddIcon />
                </IconButton>
                <CreateThread openCreateThread={openCreateThread} handleCloseCreateThread={handleCloseCreateThread}/>
            </Paper>
        </div>
    );
};

export default SearchBar;