import { Box, Typography, styled } from '@suid/material';
import { Component, splitProps, Show } from 'solid-js';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  body?: string;
}

const SectionTitle: Component<SectionTitleProps> = (props) => {
  const [{ title, subtitle, body }] = splitProps(props, ['title', 'subtitle', 'body']);

  return (
    <BoxContainer>
      <Show when={!!subtitle} children={<SubtitleStyled>{subtitle}</SubtitleStyled>} />
      <TitleStyled>{title}</TitleStyled>
      <Show when={!!body} children={<BodyStyled variant='body2'>{body}</BodyStyled>} />
    </BoxContainer>
  );
};

const BoxContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginBlockEnd: 16,
});

const SubtitleStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'center',
  fontSize: 21,
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: 36,
  marginBlockStart: 8,
  marginBlockEnd: 16,
  position: 'relative',
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.15rem',
  '&:after': {
    position: 'absolute',
    height: 5,
    width: 70,
    backgroundColor: theme.palette.primary.main,
    content: '""',
    left: 0,
    right: 0,
    margin: '0 auto',
    bottom: -12,
  },
}));

const BodyStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  textAlign: 'center',
  color: theme.palette.grey[500],
  marginBlock: 16,
  [theme.breakpoints.up('md')]: {
    width: '50%',
  },
}));

export { SectionTitle };
