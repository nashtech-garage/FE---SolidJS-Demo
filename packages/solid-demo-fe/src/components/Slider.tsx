import { JSX, Component, For } from 'solid-js';
import { createSlider } from 'solid-slider';
import { Box, IconButton, styled } from '@suid/material';
import {
  FiberManualRecord,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon,
} from '@suid/icons-material';

interface SliderProps {
  children: JSX.Element;
  perView?: number;
  spacing?: number;
  totalItems: number;
  dotContainerClass?: string;
}

const Slider: Component<SliderProps> = ({ children, perView = 1, spacing = 0, totalItems, dotContainerClass }) => {
  const [slider, { next, prev, current }] = createSlider({
    slides: {
      perView,
      spacing,
    },
  });

  const dots = Array.from({ length: totalItems - perView + 1 }, (_, i) => i + 1);

  return (
    <ContainerStyled>
      <div use:slider>{children}</div>
      <IconButtonStyled
        class='slider-pre-btn'
        onClick={prev}
        sx={{ left: '1rem', transform: 'translate(-100px, -50%)' }}
        size='small'>
        <NavigateBeforeIcon fontSize='inherit' sx={{ fontSize: '2rem' }} />
      </IconButtonStyled>
      <IconButtonStyled
        class='slider-next-btn'
        onClick={next}
        sx={{ right: '1rem', transform: 'translate(100px, -50%)' }}
        size='small'>
        <NavigateNextIcon fontSize='inherit' sx={{ fontSize: '2rem' }} />
      </IconButtonStyled>
      <DotContainer class={dotContainerClass}>
        <For
          each={dots}
          children={(_dot, i) => <DotIcon sx={{ ...(i() === current() && { color: 'primary.main' }) }} />}
        />
      </DotContainer>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Box)({
  position: 'relative',
  width: '100%',
  overflowX: 'hidden',
  '&:hover': {
    '& .slider-pre-btn': {
      transform: 'translate(1rem, -50%) !important',
      opacity: 1,
    },
    '& .slider-next-btn': {
      transform: 'translate(-1rem, -50%) !important',
      opacity: 1,
    },
  },
  paddingBlockEnd: 24,
});

const IconButtonStyled = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  transition: 'all .5s ease',
  opacity: 0,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const DotContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 4,
  transform: 'translateX(-50%)',
  left: '50%',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

const DotIcon = styled(FiberManualRecord)(({ theme }) => ({
  color: theme.palette.grey[600],
  [theme.breakpoints.down('md')]: {
    fontSize: 17,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 13,
  },
}));

export { Slider };
