import { JSX, Component } from 'solid-js';
import { createSlider } from 'solid-slider';
import { Box, IconButton, styled } from '@suid/material';
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@suid/icons-material';

interface SliderProps {
  children: JSX.Element;
  perView?: number;
  spacing?: number;
}

const Slider: Component<SliderProps> = ({ children, perView = 1, spacing = 0 }) => {
  const [slider, { next, prev }] = createSlider({
    slides: {
      perView,
      spacing,
    },
  });

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

export { Slider };
