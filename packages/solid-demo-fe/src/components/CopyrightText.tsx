import { Typography, styled } from '@suid/material';
import BoxProps from '@suid/material/Box/BoxProps';
import { Component } from 'solid-js';

const CopyrightText: Component<BoxProps<'span'>> = (props) => {
  return <CopyrightTextStyled {...props}>Copyright © FE-Team 2023</CopyrightTextStyled>;
};

const CopyrightTextStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: 16,
  letterSpacing: 0.5,
  textAlign: 'center',
}));

export { CopyrightText };
