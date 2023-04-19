import { Typography, styled } from '@suid/material';

type LogoProps = {
  class?: string
}

function Logo(props: LogoProps) {
  return (
    <LogoTypography class={props.class}>
      <span>NT</span>
      <span>Kart</span>
    </LogoTypography>
  );
}

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

export default Logo;
