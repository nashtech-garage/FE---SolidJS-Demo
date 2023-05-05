import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@suid/material';
import { Component } from 'solid-js';

import { authStore } from '../../../store';

const ProfileDetails: Component = () => {
  const {
    authState: { user },
  } = authStore;

  if (!user) {
    return null;
  }

  return (
    <Card sx={{ maxWidth: 270, margin: '0 auto' }}>
      <CardMedia sx={{ height: 270 }} image='/src/assets/images/user.jpg' title='user image' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProfileDetails;
