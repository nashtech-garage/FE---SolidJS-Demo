import { Component } from 'solid-js';
import { A } from '@solidjs/router';
import { Button, Typography } from '@suid/material';

interface ICollectionItemProps {
  title: string;
  imgURL: string;
}
const CollectionItem: Component<ICollectionItemProps> = ({ title, imgURL }) => {
  return (
    <div class='collection'>
      <img src={imgURL} alt={title} />
      <div class='collection__content'>
        <Typography variant='h5' gutterBottom>
          <b>{title.toLocaleUpperCase()}</b>
        </Typography>
        <Typography variant='subtitle2' sx={{ marginBottom: '0.6em' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry....
        </Typography>
        <A href='/products'>
          <Button variant='outlined'>SHOP NOW</Button>
        </A>
      </div>
    </div>
  );
};

export default CollectionItem;
