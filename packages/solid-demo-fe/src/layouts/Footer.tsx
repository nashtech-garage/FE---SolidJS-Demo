import { Box } from '@suid/material';
import { NewsLetter } from '../components';

function Footer() {
  return (
    <>
      <Box component='section' sx={{ marginBottom: '2rem' }}>
        <NewsLetter />
      </Box>
      <Box component='div' sx={{ textAlign: 'center', backgroundColor: '#1976D2', padding: '1rem' }} color='primary'>
        <Box sx={{ textAlign: 'center', color: '#fff' }}>
          Create by FE-Team
        </Box>
      </Box>
    </>
  );
}

export { Footer };
