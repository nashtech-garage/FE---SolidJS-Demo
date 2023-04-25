export type ISubMenuItem = {
  id: string;
  title: string;
  href: string;
};

export type IMenuItem = {
  id: string;
  title: string;
  href?: string;
  children?: ISubMenuItem[];
};

export const drawerMenu: IMenuItem[] = [
  {
    id: 'clothing',
    title: 'Clothing',
    href: '#',
  },
  {
    id: 'bags',
    title: 'Bags',
    children: [
      {
        id: 'bags-shopper-bags',
        title: 'Shopper Bags',
        href: '#',
      },
      {
        id: 'bags-laptop-bags',
        title: 'Laptop Bags',
        href: '#',
      },
      {
        id: 'bags-clutches',
        title: 'Clutches',
        href: '#',
      },
      {
        id: 'bags-purses',
        title: 'Purses',
        href: '#',
      },
    ],
  },
  {
    id: 'footwear',
    title: 'Footwear',
    children: [
      {
        id: 'footwear-sport-shoes',
        title: 'Sport Shoes',
        href: '#',
      },
      {
        id: 'footwear-formal-shoes',
        title: 'Formal Shoes',
        href: '#',
      },
      {
        id: 'footwear-causal-shoes',
        title: 'Casual Shoes',
        href: '#',
      },
    ],
  },
  {
    id: 'watches',
    title: 'Watches',
    href: '#',
  },
  {
    id: 'house-of-design',
    title: 'House of design',
  },
  {
    id: 'accessories',
    title: 'Accessories',
  },
  {
    id: 'beauty-personal-care',
    title: 'Beauty & personal care',
  },
  {
    id: 'home-decor',
    title: 'Home & decor',
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
  },
];
