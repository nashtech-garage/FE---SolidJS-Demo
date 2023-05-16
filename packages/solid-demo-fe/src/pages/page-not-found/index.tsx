import { Container, Typography, styled } from '@suid/material';

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

function PageNotFound() {
  return (
    <Container
      class='section-top-space section-bottom-space'
      sx={{
        minHeight: '55vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TypographyStyled variant='h1'>404</TypographyStyled>
      <TypographyStyled variant='h3' sx={{ marginBottom: '30px' }}>
        Page not found
      </TypographyStyled>
      <TypographyStyled variant='subtitle1'>
        We're sorry, the page you are looking for doest not exist or an other error occurred.
      </TypographyStyled>
      <TypographyStyled variant='subtitle1'>Go back, or head over to Home to choose a new direction. </TypographyStyled>
    </Container>
  );
}

export default PageNotFound;
