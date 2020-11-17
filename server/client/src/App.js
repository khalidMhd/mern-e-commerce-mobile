import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, useHistory } from 'react-router-dom'

import adminSigninScreen from './screens/auth/adminSignin';
import signinScreen from './screens/auth/Singin';
import signupScreen from './screens/auth/signup';
import restPassword from './screens/auth/resetPassword';
import newPasswordScreen from './screens/auth/newPassword';
import Home from './screens/home';
import adminDashpoard from './screens/adminDashpoard';
import addCategoryScreen from './screens/adminAddCategory';
import addProductScreen from './screens/adminAddProduct';
import listCategoryScreen from './screens/adminListCategory';
import listProductScreen from './screens/adminListProduct';
import productScreen from './screens/Products';
import categoryScreen from './screens/Category';
import productDetailScreen from './screens/productDetails';
import productByCategoryScreen from './screens/productByCategory';
import CartScreen from './screens/cart';
import aboutScreen from './screens/about';
import shippingScreen from './screens/shipping';
import PlaceOrderScreen from './screens/placeOrder';
import profileScreen from './screens/profile';
import pageNotFoundScreen from './screens/pageNotFound';


export const UserContext = createContext()


function App() {
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: 'whiteSmoke' }}>

        <Route exact path='/adminSignin' component={adminSigninScreen} />
        <Route exact path='/admin' component={adminDashpoard} />
        <Route exact path='/add-category' component={addCategoryScreen} />
        <Route exact path='/add-product' component={addProductScreen} />
        <Route exact path='/list-category' component={listCategoryScreen} />
        <Route exact path='/list-product' component={listProductScreen} />
      </div>

      <Route path='/signin' component={signinScreen} />
      <Route path='/signup' component={signupScreen} />
      <Route exact path='/reset' component={restPassword} />
      <Route path='/reset/:token' component={newPasswordScreen} />
      <Route exact path='/' component={Home} />
      <Route exact path='/product/gallery' component={productScreen} />
      <Route exact path='/category/list' component={categoryScreen} />
      <Route exact path='/product/details/:id' component={productDetailScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route exact path='/category/product/:catName' component={productByCategoryScreen} />
      <Route path='/about' component={aboutScreen} />
      <Route path='/shipping' component={shippingScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/profile/' component={profileScreen} />
      {/* <Route exact={true} component={pageNotFoundScreen} /> */}

    </BrowserRouter>
  );
}

export default App;
