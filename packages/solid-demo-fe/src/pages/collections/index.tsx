import { For, Match, Switch } from 'solid-js';
import { Container, Grid, Typography } from '@suid/material';
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

function Colllections() {
  const collectionsQuery = createQuery(
    () => ['collections'],
    () => medusaClient.collections.list()
  );

  const products = () => {
    return (collectionsQuery.data?.collections || []).map((collection, index) => ({
      ...collection,
      imgURL: CollectionImages[index % 7],
    }));
  };

  return (
    <Container class='section-top-space section-bottom-space'>
      <Grid container spacing={3}>
        <Switch>
          <Match when={collectionsQuery.isLoading}>
            <Typography variant='caption'>Loading data...</Typography>
          </Match>
          <Match when={collectionsQuery.isError}>
            <Typography variant='caption'>{JSON.stringify(collectionsQuery.error)}</Typography>
          </Match>
          <Match when={collectionsQuery.isSuccess}>
            <For
              each={products()}
              children={(collection) => (
                <Grid item xs={12} sm={6} xl={3}>
                  <CollectionItem title={collection.title} imgURL={collection.imgURL} />
                </Grid>
              )}></For>
          </Match>
        </Switch>
      </Grid>
    </Container>
  );
}

export default Colllections;
