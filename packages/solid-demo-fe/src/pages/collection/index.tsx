import { For } from 'solid-js';
import { Container, Grid } from '@suid/material';
import { createQuery } from '@tanstack/solid-query';

import { medusaClient } from '../../utils';
import CollectionItem from '../../components/Collection';

import CollectionImage0 from '../../assets/images/0.jpg';
import CollectionImage1 from '../../assets/images/1.jpg';
import CollectionImage2 from '../../assets/images/2.jpg';
import CollectionImage3 from '../../assets/images/3.jpg';
import CollectionImage4 from '../../assets/images/4.jpg';
import CollectionImage5 from '../../assets/images/5.jpg';
import CollectionImage6 from '../../assets/images/6.jpg';

const CollectionImages = [
  CollectionImage0,
  CollectionImage1,
  CollectionImage2,
  CollectionImage3,
  CollectionImage4,
  CollectionImage5,
  CollectionImage6,
];

function Colllection() {
  const productsQuery = createQuery(
    () => ['collections'],
    () => medusaClient.collections.list()
  );

  const products = () => {
    return (productsQuery.data?.collections || []).map((collection, index) => ({
      ...collection,
      imgURL: CollectionImages[index % 7],
    }));
  };

  return (
    <Container class='section-top-space section-bottom-space'>
      <Grid container spacing={3}>
        <For
          each={products()}
          children={(collection) => (
            <Grid item xs={12} sm={6} xl={3}>
              <CollectionItem title={collection.title} imgURL={collection.imgURL}/>
            </Grid>
          )}></For>
      </Grid>
    </Container>
  );
}

export default Colllection;
