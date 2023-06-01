import { lazy, onMount } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { MainLayout } from './layouts';
import { CartAction, dispatchCart } from './store';
import RouteGuard from './route-guard/RouteGuard';

const Products = lazy(() => import('./pages/products'));
const Home = lazy(() => import('./pages/home'));
const SingleProduct = lazy(() => import('./pages/single-product'));
const ShoppingCart = lazy(() => import('./pages/shopping-cart'));
const ProfileDetails = lazy(() => import('./pages/my-profile/detail'));
const PageNotFound = lazy(() => import('./pages/page-not-found'));
const Collections = lazy(() => import('./pages/collections'));

function App() {
  onMount(() => {
    dispatchCart(CartAction.GetCart);
  });

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' component={Home} />
        <Route path='/products' component={Products} />
        <Route path='/products/:productId' component={SingleProduct} />
        <Route path='/shopping-cart' component={ShoppingCart} />
        <Route path='/collections' component={Collections} />
        <Route path='/collections/:collectionId' component={Products} />
      </Route>
      <Route path='/my-profile' component={RouteGuard}>
        <Route path='/detail' component={ProfileDetails} />
      </Route>
      <Route path='*' component={PageNotFound}/>
    </Routes>
  );
}

export default App;
