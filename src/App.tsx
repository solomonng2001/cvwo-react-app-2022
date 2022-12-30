import Home from './pages/Home';
import ThreadPage from './pages/ThreadPage';
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from './components/NavBar';

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
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <NavBar/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/thread/:threadID" element={<ThreadPage />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
