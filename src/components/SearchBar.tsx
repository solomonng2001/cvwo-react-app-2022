import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import CreateThread from './CreateThread';
import ThreadSearch from '../types/ThreadSearch';
import { Typography, CardActionArea } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TagIcon from '@mui/icons-material/Tag';
import { strToArray } from '../actions/actions';
import { Thread } from '../types/Thread';
import CurrentUserState from '../types/CurrentUserState';
import GlobalMessageState from '../types/GlobalMessageState';

type Props = {
    setThreadResults: React.Dispatch<React.SetStateAction<Thread[]>>;
    currentUserState: CurrentUserState;
    API: string;
    globalMessageState: GlobalMessageState;
}

const SearchBar: React.FC<Props> = ({setThreadResults, currentUserState, API, globalMessageState}: Props) => {
    const handleRedirectToThreadPage = (threadID: number) => {
        window.location.replace(
            window.location.protocol + "//" + window.location.host + '/thread/' + threadID.toString()
        );
    }

    const [openCreateThread, setOpenCreateThread] = React.useState<boolean>(false);

    const handleClickOpenCreateThread = () => {
        if (currentUserState.isLoggedIn) {
            setOpenCreateThread(true);
        } else {
            globalMessageState.setSeverityGlobalMessage("info");
            globalMessageState.setGlobalMessage(["Please login to create thread"]);
            globalMessageState.handleOpenGlobalMessage();
        }
    };
  
    const handleCloseCreateThread = () => {
      setOpenCreateThread(false);
    };

    const [searchByTags, setSearchByTags] = useState<Boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [results, setResults] = useState<ThreadSearch[]>([]);

    const handleClickSearch = () => {
        if (search === "") {
            return;
        } else if (searchByTags) {
            const tagsArray = strToArray(search);
            fetch(API + "/thread_pages/search/tags", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tagsArray,
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setThreadResults(result);
                    }
                )
        } else {
            const title = search;
            fetch(API + "/thread_pages/search/title", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setThreadResults(result);
                    }
                )
        }
    }

    useEffect(() => {
        if (search === "") {
            setResults([]);
        }
        else if (searchByTags) {
            const tagsArray = strToArray(search);
            console.log(tagsArray);
            fetch(API + "/thread_pages/search/tags/autocomplete", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tagsArray,
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setResults(result);
                    }
                )
        } else {
            const title = search;
            fetch(API + "/thread_pages/search/title/autocomplete", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setResults(result);
                    }
                )
        }
    }, [search, searchByTags, API]);

    return (
        <div style={{paddingTop: '20px', paddingBottom: '20px', position: 'sticky', top: '50px', zIndex: '1100'}}>
            <Paper
            component="form" 
            sx={{ display: 'flex', alignItems: 'center' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={
                        searchByTags ? "Search by Tags: #HawkerFood #Travel # School" : "Search by Title"}
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                <IconButton onClick={handleClickSearch}>
                    <SearchIcon />
                </IconButton>
                <IconButton onClick={() => setSearchByTags(!searchByTags)}>
                    <TagIcon color={searchByTags ? 'primary' : "disabled"}/>
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton onClick={handleClickOpenCreateThread}>
                    <LibraryAddIcon />
                </IconButton>
                <CreateThread API={API} openCreateThread={openCreateThread} handleCloseCreateThread={handleCloseCreateThread} currentUserState={currentUserState}/>
            </Paper>
            { results.length > 0 &&
                <Paper sx={{justifyItems: "flex-start"}}>
                    <Stack direction="column" alignItems="flex-start">
                        { results.map(result =>
                                <CardActionArea style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 8}} 
                                    onClick={() => handleRedirectToThreadPage(result.id)}
                                >
                                    <Typography key={result.id} align="left">{result.title}</Typography>
                                </CardActionArea>
                        )}
                    </Stack>
                </Paper>
            }
        </div>
    );
};

export default SearchBar;