import { Component, For, createEffect, createSignal } from 'solid-js';
import { Box, styled, useMediaQuery, useTheme } from '@suid/material';

import { BRAND_ICONS } from '../constants';
import { Slider } from './Slider';
import { Section } from './Section';

const BrandList: Component = () => {
  const theme = useTheme();
  const isMdView = useMediaQuery(theme.breakpoints.up('md'));
  const [perView, setPerView] = createSignal(isMdView() ? 5 : 3);

  createEffect(() => {
    setPerView(isMdView() ? 5 : 3);
  });

  return (
    <Section>
      <Slider perView={perView()} totalItems={BRAND_ICONS.length}>
        <For each={BRAND_ICONS} children={(data) => <ImageStyled component='img' {...data} />} />
      </Slider>
    </Section>
  );
};

const ImageStyled = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 100,
  },
  [theme.breakpoints.up('md')]: {
    height: 150,
  },
}));

export { BrandList };
