import Axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_STATUS_REQUEST, ORDER_UPDATE_STATUS_SUCCESS, ORDER_UPDATE_STATUS_FAIL } from "../constants/order";

const createOrder = (address, city, postalCode, country, user, product,qty) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST, payload: address, city, postalCode, country, user, product,qty });
      const { userSignin: { userInfo } } = getState();
      const { data } = await Axios.post("/placeOrder", {address, city, postalCode, country, user, product,qty},{
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      })
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
  }
  
  const listOrder =()=> async (dispatch,getState) =>{
    try {
        dispatch({type:ORDER_LIST_REQUEST})
        const { userSignin: { userInfo } } = getState();

        const {data} = await Axios.get('/placeOrdersSecreen',{
          headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
        })

        dispatch({type:ORDER_LIST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type: ORDER_LIST_FAIL, payload:error.message})
    }
}

const deleteOrder =(id) => async (dispatch,getState )=>{
  try {
    dispatch({type:ORDER_DELETE_REQUEST, payload: id})
    const { userSignin: { userInfo } } = getState();

    const {data} = await Axios.delete('/order-delete/'+id,{
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    })
    dispatch({type:ORDER_DELETE_SUCCESS, payload:data})
  } catch (error) {
    dispatch({type:ORDER_DELETE_FAIL, payload:error.message})
  }
}

const updateOrderStatus = (id, status) => async (dispatch,getState)=>{
  try {
    dispatch({type: ORDER_UPDATE_STATUS_REQUEST, payload:id, status})
    const { userSignin: { userInfo } } = getState();

    const {data} = await Axios.put('/update-status/'+id,{status},{
      headers: {
        Authorization: ' Bearer ' + userInfo.token
      }
    })
    dispatch({type:ORDER_UPDATE_STATUS_SUCCESS, payload:data})
  } catch (error) {
    dispatch({type:ORDER_UPDATE_STATUS_FAIL, payload:error.message})
  }
}


export {createOrder, listOrder, deleteOrder, updateOrderStatus}