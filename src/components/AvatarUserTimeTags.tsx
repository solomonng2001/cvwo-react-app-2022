import React from 'react';
import { Grid, Chip, Typography } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';

type Props = {
    tagged: boolean;
    user: string;
    time: Date;
};

const AvatarUserTimeTags: React.FC<Props> = ({ tagged, user, time }: Props) => {
    const first_letter = user[0];
    if (tagged) {
        return (
            <Grid container>
                <Grid item xs={6} container direction='row' spacing ={5}>
                    <Grid item style={{width: 80}} >
                        <Avatar variant='rounded' sx={{ width: 70, height: 70 }}>{ first_letter }</Avatar>
                    </Grid>
                    <Grid item xs={9} container direction='column'>
                        <Grid item>
                            <Typography align='left' variant='h5'>{ user }</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align='left' variant='subtitle1' color='textSecondary'>Posted on { time.toLocaleString() }</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container xs={6} direction='row' spacing={1} justifyContent='flex-end' alignItems='flex-start'>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                    <Grid item>
                        <Chip label="primary" />
                    </Grid>
                </Grid>
            </Grid>
        );
    }

    // Without tags
    return (
        <Grid container>
            <Grid item xs={6} container direction='row' spacing ={5}>
                <Grid item xs={3} >
                    <Avatar variant='rounded' sx={{ width: 70, height: 70 }}>{ first_letter }</Avatar>
                </Grid>
                <Grid item xs={9} container direction='column'>
                    <Grid item>
                        <Typography align='left' variant='h5'>{ user }</Typography>
                    </Grid>
                    <Grid item>
                        <Typography align='left' variant='subtitle1' color='textSecondary'>Posted on { time.toLocaleString() }</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    );
};

export default AvatarUserTimeTags;