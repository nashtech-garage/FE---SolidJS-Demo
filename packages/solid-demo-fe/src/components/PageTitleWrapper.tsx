import { Box, Container, Typography, styled } from '@suid/material';
import { Component } from 'solid-js';

interface PageTitleWrapperProps {
  title?: string;
}

const PageTitleWrapper: Component<PageTitleWrapperProps> = (props) => {
  return (
    <MainContainer>
      <Container>
        <Typography fontWeight="bold" color='#222'>
          {props.title}
        </Typography>
      </Container>
    </MainContainer>
  );
};

const MainContainer = styled(Box)({
  backgroundColor: '#f8f8f8',
  padding: 16,
  marginBottom: 32,
});

export { PageTitleWrapper };
