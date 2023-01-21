import React from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import Stack from '@mui/material/Stack';

type Props = {
    tagged: boolean;
    user: string;
    time: Date;
    tags: string;
};

const AvatarUserTimeTags: React.FC<Props> = ({ tagged, user, time, tags }: Props) => {
    if (tagged) {
        const tagsArray= tags.split(",");
        return (
            <Grid container>
                <Grid item xs={6}>
                    <Stack direction='row' spacing={2}>
                        <Avatar/>
                        <Stack direction='column'>
                            <Typography align='left' variant='h5'>{ user }</Typography>
                            <Typography align='left' variant='subtitle1' color='textSecondary'>{moment(time).fromNow()}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item container xs={6} direction='row' spacing={1} justifyContent='flex-end' alignItems='flex-start'>
                    { tagsArray.map(tag =>
                        <Grid item key={tag}>
                            <Chip label={tag} />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        );
    }

    // Without tags
    return (
        <Grid container>
            <Grid item xs={6}>
                <Stack direction='row' spacing={2}>
                    <Avatar/>
                    <Stack direction='column'>
                        <Typography align='left' variant='h5'>{ user }</Typography>
                        <Typography align='left' variant='subtitle1' color='textSecondary'>{moment(time).fromNow()}</Typography>
                    </Stack>
                </Stack>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    );
};

export default AvatarUserTimeTags;