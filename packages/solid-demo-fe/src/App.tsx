import { lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

import { MainLayout } from './layouts';

const Products = lazy(() => import('./pages/products'));
const Home = lazy(() => import('./pages/home'));
const SingleProduct = lazy(() => import('./pages/single-product'));
const ShoppingCart = lazy(() => import('./pages/shopping-cart'));

function App() {
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
