import Home from './pages/Home';
import ThreadPage from './pages/ThreadPage';
import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';
import CurrentUser from './types/CurrentUser';
import GlobalMessage from './components/GlobalMessage';
import { AlertColor } from '@mui/material/Alert';
import MyThreads from './pages/MyThreads';

const API: string = "https://chitchat-33jh.onrender.com";

const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

const App: React.FC = () => {
  const [globalMessage, setGlobalMessage] = useState<string[]>([]);
  const [severityGlobalMessage, setSeverityGlobalMessage] = useState<AlertColor | undefined>(undefined);
  const [openGlobalMessage, setOpenGlobalMessage] = useState<boolean>(true);
  const handleCloseGlobalMessage = () => {
      setOpenGlobalMessage(false);
      setSeverityGlobalMessage(undefined);
      setGlobalMessage([]);
  }
  const handleOpenGlobalMessage = () => {
    setOpenGlobalMessage(true);
  }
  const globalMessageState = {
    setGlobalMessage: setGlobalMessage,
    setSeverityGlobalMessage: setSeverityGlobalMessage,
    handleOpenGlobalMessage: handleOpenGlobalMessage,
  }

  const emptyCurrentUser = {
    id: 0,
    username: "",
    password_digest: "",
    created_at: "",
    updated_at: "",
  }
  const [currentUser, setCurrentUser] = useState<CurrentUser>(emptyCurrentUser);
  const currentUserState = {
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    emptyCurrentUser: emptyCurrentUser,
    isLoggedIn: currentUser.id !== 0,
  }

  useEffect(() => {
    let new_message: string[] = [];
    const token = localStorage.getItem("token")
    if (token) {
      fetch(API + "/login", {
        method: "GET",
        headers: {
          Authorization: `${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setSeverityGlobalMessage('error');
          data.error.map((error: string) =>
              new_message.push(error));
          setGlobalMessage(new_message);
        } else {
          setCurrentUser(data);
        }
      })
    }
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <NavBar API={API} currentUserState={currentUserState} globalMessageState={globalMessageState}/>
          < GlobalMessage globalMessage={globalMessage} severityGlobalMessage={severityGlobalMessage} openGlobalMessage={openGlobalMessage} handleCloseGlobalMessage={handleCloseGlobalMessage}/>
          <BrowserRouter>
            <Routes>
                <Route path="/thread/:threadID" element={<ThreadPage globalMessageState={globalMessageState} currentUserState={currentUserState} API={API}/>} />
                <Route path="/" element={<Home globalMessageState={globalMessageState} currentUserState={currentUserState} API={API}/>} />
                <Route path="/mythreads" element={<MyThreads globalMessageState={globalMessageState} currentUserState={currentUserState} API={API}/>} />
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
