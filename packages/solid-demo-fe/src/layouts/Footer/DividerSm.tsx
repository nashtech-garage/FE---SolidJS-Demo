import { Divider, styled } from '@suid/material';
import { Component } from 'solid-js';

const DividerSm: Component = () => <DividerStyled />;

const DividerStyled = styled(Divider)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export { DividerSm };
