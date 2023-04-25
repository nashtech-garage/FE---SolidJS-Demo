import { Box, styled, Container } from '@suid/material';
import BoxProps from '@suid/material/Box/BoxProps';
import { ParentComponent } from 'solid-js';

const Section: ParentComponent<BoxProps<'section'>> = (props) => (
  <SectionStyled component='section' maxWidth='xl'>
    {props.children}
  </SectionStyled>
);

const SectionFull: ParentComponent<BoxProps<'section'>> = (props) => <Box component='section'>{props.children}</Box>;

const SectionContainerFull: ParentComponent<BoxProps<'section'>> = (props) => (
  <SectionStyled>{props.children}</SectionStyled>
);

const SectionStyled = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    paddingInline: '0.5rem',
    marginBlock: 32,
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: '4rem',
    marginBlock: 64,
  },
}));

export { Section, SectionFull, SectionContainerFull };
