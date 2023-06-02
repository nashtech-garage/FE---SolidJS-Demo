import Addidas from '../assets/icons/adidas.svg';
import Gucci from '../assets/icons/gucci.svg';
import Hermes from '../assets/icons/hermes.svg';
import Levis from '../assets/icons/levis.svg';
import NewBalance from '../assets/icons/new.svg';
import Prada from '../assets/icons/prada.svg';
import Zara from '../assets/icons/zara.svg';
import Google from '../assets/icons/google-plus.svg';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';

export * from './footer';
export * from './snackbarMessage';
export * from './alert';

export const BRAND_ICONS = [
  {
    src: Addidas,
    alt: 'Addidas',
  },
  {
    src: Hermes,
    alt: 'Hermes',
  },
  {
    src: Levis,
    alt: 'Levis',
  },
  {
    src: NewBalance,
    alt: 'New Balance',
  },
  {
    src: Prada,
    alt: 'Prada',
  },
  {
    src: Zara,
    alt: 'Zara',
  },
  {
    src: Gucci,
    alt: 'Gucci',
  },
];

export const SOCIAL_NETWORK_LIST = [
  {
    src: Facebook,
    alt: 'Facebook',
  },
  {
    src: Google,
    alt: 'Google',
  },
  {
    src: Instagram,
    alt: 'Instagram',
  },
  {
    src: Twitter,
    alt: 'Twitter',
  },
];

export const BASE_API_URL = 'http://localhost:9005';
