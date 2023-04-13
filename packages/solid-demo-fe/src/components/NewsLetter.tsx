import { Box, Typography, Input, IconButton, Button } from '@suid/material';
function NewsLetter() {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: { lg: '4rem', xs: '2rem' },
        paddingRight: { lg: '4rem', xs: '2rem' },
      }}>
      <Box component='form'>
        <Typography
          variant='h2'
          mt={10}
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem',
            marginBottom: '0.3rem',
          }}>
          {' '}
          Subscribe to our newsletter
        </Typography>
        <Typography sx={{ textAlign: 'center', marginBottom: '1rem' }}>
          Get 10% off your first purchase and stay on top of the latest in Debutify, it's win-win-WIN!
        </Typography>
        <Box sx={{ marginBottom: '2rem' }}>
          <Input placeholder='First Name' sx={{ textAlign: 'center', width: '100%' }} />
        </Box>
        <Box sx={{ marginBottom: '2rem' }}>
          <Input placeholder='Your Email' sx={{ textAlign: 'center', width: '100%' }} />
        </Box>
        <Box sx={{ textAlign: 'center', width: '100%', marginBottom: '1rem' }}>
          <IconButton>
            <Button variant='contained' color='primary'>
              Subscribe
            </Button>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export { NewsLetter };
