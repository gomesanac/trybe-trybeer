import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

import AdminOrders from './pages/AdminOrders';
import CheckoutPage from './pages/CheckoutPage';
import AdminProfile from './pages/AdminProfile';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ClientOrdersPage from './pages/ClientOrdersPage';
import ClientOrderDetail from './pages/ClientOrderDetail';
import AdminOrderDetail from './pages/AdminOrderDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/orders/:id" component={ AdminOrderDetail } />
        <Route path="/admin/orders" component={ AdminOrders } />
        <Route path="/admin/profile" component={ AdminProfile } />
        <Route path="/orders/:id" component={ ClientOrderDetail } />
        <Route path="/orders" component={ ClientOrdersPage } />
        <Route path="/profile" component={ ProfilePage } />
        <Route path="/checkout" component={ CheckoutPage } />
        <Route path="/register" component={ SignupPage } />
        <Route path="/products" component={ ProductsPage } />
        <Route path="/login" component={ LoginPage } />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
