import { Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import React from 'react';

type Props = {
    toOverflow: boolean;
    body: string;
}

const BodyAddHTML: React.FC<Props> = ({ body, toOverflow }: Props) => {
    const body_array: string[] = body.split('\n').filter(ele => ele !== "");

    if (!toOverflow) {
        return (
            <Stack direction='column' spacing={0}>
                { body_array.map((line, index) => (
                    <div key={index}>
                        <Typography align='left' variant="body1">
                            {line}
                        </Typography>
                        <br />
                    </div>
                ))}
            </Stack>
        );
    }

    const body_elipsis = body_array.join('...');
    return (
        <Typography noWrap={toOverflow} align='left' variant="body1">
            {body_elipsis}
        </Typography>
    );
};

export default BodyAddHTML;