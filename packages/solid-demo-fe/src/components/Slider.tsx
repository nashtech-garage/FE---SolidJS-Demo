import { JSX, Component } from 'solid-js';
import { createSlider } from 'solid-slider';
import { Box, IconButton } from '@suid/material';
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@suid/icons-material';

interface SliderProps {
  children: JSX.Element;
  perView?: number;
  spacing?: number;
}

const buttonStyle = {
  top: '50%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  transition: 'all .5s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
};

const containerStyle = {
  '&:hover': {
    '& .slider-pre-btn': {
      transform: 'translate(1rem, -50%) !important',
    },
    '& .slider-next-btn': {
      transform: 'translate(-1rem, -50%) !important',
    },
  },
};

const Slider: Component<SliderProps> = ({ children, perView = 1, spacing = 0 }) => {
  const [slider, { next, prev }] = createSlider({
    slides: {
      perView,
      spacing,
    },
  });

  return (
    <Box sx={{ position: 'relative', ...containerStyle }}>
      <div use:slider>{children}</div>
      <IconButton
        class='slider-pre-btn'
        onClick={prev}
        sx={{ position: 'absolute', ...buttonStyle, left: '1rem', transform: 'translate(-100px, -50%)' }}
        size='small'>
        <NavigateBeforeIcon fontSize='inherit' sx={{ fontSize: '2rem' }} />
      </IconButton>
      <IconButton
        class='slider-next-btn'
        onClick={next}
        sx={{ position: 'absolute', ...buttonStyle, right: '1rem', transform: 'translate(100px, -50%)' }}
        size='small'>
        <NavigateNextIcon fontSize='inherit' sx={{ fontSize: '2rem' }} />
      </IconButton>
    </Box>
  );
};

export { Slider };
