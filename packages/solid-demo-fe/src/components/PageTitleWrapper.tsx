import { Box, Container, Typography, styled } from '@suid/material';
import { Component } from 'solid-js';

interface PageTitleWrapperProps {
  title?: string;
}

const PageTitleWrapper: Component<PageTitleWrapperProps> = (props) => {
  return (
    <MainContainer>
      <Container>
        <Typography variant='h5' color='#777' fontWeight='bold'>
          {props.title}
        </Typography>
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled(Box)({
  backgroundColor: '#f8f8f8',
  padding: 32,
  marginBottom: 32,
});

export { PageTitleWrapper };
