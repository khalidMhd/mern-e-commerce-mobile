import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { signinReducer, signupReducer, admnSigninReducer, resetPasswordReducer, newPasswordReducer } from './reducers/auth'
import { categoryAddReducer, categoryListReducer, categoryDeleteReducer, categoryUpdateReducer, categoryByNameListReducer } from './reducers/category'
import { productAddReducer, productDeleteReducer, productListReducer, productUpdateReducer,productDetailReducer, productByCategoryListReducer } from './reducers/product'
import { cartReducer } from './reducers/cart'
import { orderCreateReducer, orderDeleteReducer, orderListReducer } from './reducers/order'
import { userProfileReducer } from './reducers/profile'


const userInfo = Cookie.getJSON("userInfo") || null
const adminInfo = Cookie.getJSON("adminInfo") || null
const cartItems = Cookie.getJSON("cartItems") || []

const initialState = {cart:{cartItems},userSignin: { userInfo }, adminSignin:{adminInfo}   }
const reducer = combineReducers({
    userSignin:signinReducer,
    userSignup: signupReducer,
    adminSignin: admnSigninReducer,
    passwordReset: resetPasswordReducer,
    newPassword: newPasswordReducer,
    categoryAdd:categoryAddReducer,
    categoryList: categoryListReducer,
    categoryDelete:categoryDeleteReducer,
    categoryUpdate:categoryUpdateReducer,
    productAdd:productAddReducer,
    productList:productListReducer,
    productDelete:productDeleteReducer,
    productUpdate:productUpdateReducer,
    productDetails:productDetailReducer,
    ProductByCategoryList:productByCategoryListReducer,
    categoryByNameList:categoryByNameListReducer,
    cart:cartReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    orderDelete:orderDeleteReducer,
    userProfile:userProfileReducer

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store