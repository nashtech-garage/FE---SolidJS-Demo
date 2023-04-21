import { lazy, onMount } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { MainLayout } from './layouts';
import { CartAction, dispatchCart } from './store';
import { medusaClient } from './utils';

const Products = lazy(() => import('./pages/products'));
const Home = lazy(() => import('./pages/home'));
const SingleProduct = lazy(() => import('./pages/single-product'));
const ShoppingCart = lazy(() => import('./pages/shopping-cart'));

function App() {
  onMount(() => {
    const getCart = async () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        const { cart } = await medusaClient.carts.retrieve(cartId);
        dispatchCart(CartAction.SetCart, cart);
      }
    };

    getCart();
  });

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' component={Home} />
        <Route path='/products' component={Products} />
        <Route path='/products/:productId' component={SingleProduct} />
        <Route path='/shopping-cart' component={ShoppingCart} />
      </Route>
    </Routes>
  );
}

export default App;
