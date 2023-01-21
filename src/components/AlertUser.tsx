import Alert, { AlertColor } from '@mui/material/Alert';

import React from 'react';

type Props = {
    severity: AlertColor | undefined;
    message: string[];
}

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