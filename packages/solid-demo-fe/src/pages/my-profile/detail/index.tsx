import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Divider, Stack, Typography } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';
import { createSignal } from 'solid-js';
import { getCurrentCustomer } from '../../../utils';
import * as image from '../../../assets/images/user.png'
function ProfileDetails() {
    const [userInfo, setUserInfo] = createSignal<any>({});

    getCurrentCustomer().then(({ customer }) => {
        setUserInfo(customer)
    })

    return (
        <Card sx={{ maxWidth: 270, margin: "0 auto" }}>
            <CardMedia
                sx={{ height: 270 }}
                image='/src/assets/images/user.jpg'
                title="user image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {userInfo().first_name} {userInfo().last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {userInfo().email}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default ProfileDetails;
