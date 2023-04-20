import { Component, For } from 'solid-js';
import { Box, Grid, Typography, styled } from '@suid/material';
import { Link } from '@solidjs/router';

import { FOOTER_CATEGORIES, FOOTER_STORE_INFOMATION, FOOTER_WHY_WE_CHOOSE, SOCIAL_NETWORK_LIST } from '../../constants';
import { Col } from './Col';
import { Logo } from '../../components';
import { DividerSm } from './DividerSm';

const MainContent: Component = () => {
  return (
    <ContainerStyled container>
      <InfoColStyled item xs={12} sm={6} md={3} lg={4}>
        <Logo sx={{ p: 0 }} />
        <InfoContentStyled>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam,
        </InfoContentStyled>
        <SocialNetworkStyled>
          <For
            each={SOCIAL_NETWORK_LIST}
            children={(data) => (
              <Link href='#'>
                <ImageIconStyled component='img' {...data} height={24} />
              </Link>
            )}
          />
        </SocialNetworkStyled>
      </InfoColStyled>
      <DividerSm />
      <Col list={FOOTER_CATEGORIES} title='CATEGORIES' />
      <Col list={FOOTER_WHY_WE_CHOOSE} title='WHY WE CHOOSE' />
      <Col list={FOOTER_STORE_INFOMATION} title='STORE INFORMATION' hideDivider />
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Grid)(({ theme }) => ({
  paddingBlock: 32,
  gap: 16,
  [theme.breakpoints.down('lg')]: {
    gap: 8,
  },
  [theme.breakpoints.down('md')]: {
    gap: 0,
  },
  [theme.breakpoints.down('sm')]: {
    paddingBlock: 16,
  },
}));

const InfoColStyled = styled(Grid)(({ theme }) => ({
  paddingInlineEnd: 112,
  [theme.breakpoints.down('lg')]: {
    paddingInlineEnd: 32,
  },
}));

const InfoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.grey[600],
  marginBlock: 8,
}));

const SocialNetworkStyled = styled(Box)({
  opacity: 0.7,
  display: 'flex',
  gap: 24,
  paddingBlock: 8,
});

const ImageIconStyled = styled(Box)({});

export { MainContent };
