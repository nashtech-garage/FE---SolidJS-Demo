import { Component } from 'solid-js';
import { Breakpoint, Theme, Typography, styled } from '@suid/material';
import { SxProps } from '@suid/system';

type LogoProps = {
  class?: string;
  sx?: SxProps<Theme<Breakpoint>>;
};

const Logo: Component<LogoProps> = (props) => {
  return (
    <LogoTypography class={props.class} sx={props.sx}>
      <span>NT</span>
      <span>Kart</span>
    </LogoTypography>
  );
};

const LogoTypography = styled(Typography)({
  fontSize: '1.3rem',
  color: '#777',
  fontWeight: 'bold',
  padding: '1rem',

  'span:nth-child(1)': {
    color: '#ff4c3b',
  },

  'span:nth-child(2)': {
    color: '#000',
  },
});

export { Logo };
