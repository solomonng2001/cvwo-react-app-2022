import React from 'react';
import { AlertColor } from '@mui/material/Alert';

type GlobalMessageState = {
    setGlobalMessage: React.Dispatch<React.SetStateAction<string[]>>;
    setSeverityGlobalMessage: React.Dispatch<React.SetStateAction<AlertColor | undefined>>;
    handleOpenGlobalMessage: () => void;
}

export default GlobalMessageState;