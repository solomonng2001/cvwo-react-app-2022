import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type Props = {
    globalMessage: string[];
    severityGlobalMessage: AlertColor | undefined;
    handleCloseGlobalMessage: () => void;
    openGlobalMessage: boolean;
}

const GlobalMessage: React.FC<Props> = ({globalMessage, severityGlobalMessage, handleCloseGlobalMessage, openGlobalMessage}: Props) => {

    return (
        <Stack spacing={2}>
            { globalMessage.map(message =>
                <Snackbar open={openGlobalMessage} autoHideDuration={6000} onClose={handleCloseGlobalMessage}>
                    <Alert onClose={handleCloseGlobalMessage} severity={severityGlobalMessage} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            )}
        </Stack>
    );
}

export default GlobalMessage;