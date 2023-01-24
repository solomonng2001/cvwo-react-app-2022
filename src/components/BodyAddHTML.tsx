import { Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';

import React from 'react';

type Props = {
    toOverflow: boolean;
    body: string;
}

const BodyAddHTML: React.FC<Props> = ({ body, toOverflow }: Props) => {
    
    // parse body string obtained from backend, and convert into array of tags string, with "next line" property handled
    const body_array: string[] = body.split('\n').filter(ele => ele !== "");

    // if text to be fully displayed (threads in individual ThreadView page)
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

    // if text-overflow: "..." to summarize text and keep text short (threads list view eg. homepage and mythreads page)
    const body_elipsis = body_array.join('...');
    return (
        <Typography noWrap={toOverflow} align='left' variant="body1">
            {body_elipsis}
        </Typography>
    );
};

export default BodyAddHTML;