import Alert, { AlertColor } from '@mui/material/Alert';

import React from 'react';

type Props = {
    severity: AlertColor | undefined;
    message: string[];
}

// display success/error messages to user from array of messages (displayed in dialog pages, different from global messages)
const AlertUser: React.FC<Props> = ({severity, message}: Props) => {
    return (
        <>
            { message.map(error =>
                <Alert severity={severity}>{error}</Alert>)  
            }
        </>
    );
};

export default AlertUser;