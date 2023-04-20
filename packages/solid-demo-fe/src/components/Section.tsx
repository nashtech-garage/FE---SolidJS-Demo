import { Box, styled } from '@suid/material';
import { Component, JSX } from 'solid-js';

interface SectionProps {
  children: JSX.Element;
}

const Section: Component<SectionProps> = (props) => <SectionStyled component='section'>{props.children}</SectionStyled>;

const SectionStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    paddingInline: '0.5rem',
    marginBlock: 32,
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: '4rem',
    marginBlock: 64,
  },
}));

export { Section };
