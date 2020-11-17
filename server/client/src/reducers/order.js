import { Switch } from "react-router-dom";

const { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL } = require("../constants/order");

function orderCreateReducer(state = [], action) {
    switch (action.type) {
      case ORDER_CREATE_REQUEST:
        return { loading: true };
      case ORDER_CREATE_SUCCESS:
        return { loading: false, order: action.payload, success: true };
      case ORDER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

function orderListReducer(state = {orders:[]},action){
  switch(action.type) {
    case ORDER_LIST_REQUEST:
      return {loading: true}
    case ORDER_LIST_SUCCESS: 
      return {loading: false, orders: action.payload}
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
      default:
        return state;
  }
}

function orderDeleteReducer(state ={order:{}},action) {
  switch(action.type){
    case ORDER_DELETE_REQUEST:
      return {loading: true,}
    case ORDER_DELETE_SUCCESS:
      return {loading:false, order: action.payload, success:true}
    case ORDER_DELETE_FAIL:
      return {loading:false, error:action.payload}
    default:
      return state
  }

}

  export {orderCreateReducer, orderListReducer, orderDeleteReducer}