import {
  PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL,
  PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
  PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL,
  PRODUCT_BY_CATEGORY_LIST_REQUEST, PRODUCT_BY_CATEGORY_LIST_SUCCESS, PRODUCT_BY_CATEGORY_LIST_FAIL
} from "../constants/product"

const { default: Axios } = require("axios")

const addProduct = (name, categoryName, price, countInStock, url, details) => async (dispatch,getState) => {
  dispatch({ type: PRODUCT_ADD_REQUEST, payload: { name, categoryName, price, countInStock, url, details } })
  try {
    const {userSignin: {userInfo}} =getState()
    const { data } = await Axios.post('/product', { name, categoryName, price, countInStock, url, details },{
      headers:{
        Authorization: "Bearer "+ userInfo.token
      }
    })
    dispatch({ type: PRODUCT_ADD_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_ADD_FAIL, payload: error.message })
  }
}

const updateProduct = (id, name, categoryName, price,countInStock, details) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: { id, name, categoryName, price, countInStock, details } })
  try {
    const {userSignin:{userInfo}} = getState()
    const { data } = await Axios.put('/product/' + id, { name, categoryName, price,countInStock, details },{
      headers:{
        Authorization:"Bearer "+ userInfo.token
      }
    })
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message })
  }
}

const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await Axios.get('/product')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
  }
}

const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id })
    const {userSignin:{userInfo}} = getState()
    const { data } = await Axios.delete('/product/' + id,{
      headers:{
        Authorization:"Bearer "+userInfo.token
      }
    })
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true })
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message })
  }
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST, payload: productId });
    const { data } = await Axios.get('/product/' + productId);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.message });
  }
};

const ListProductByCategory = (catName) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_BY_CATEGORY_LIST_REQUEST, payload: catName })
    const { data } = await Axios.get('/category/'+catName)
    dispatch({ type: PRODUCT_BY_CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRODUCT_BY_CATEGORY_LIST_FAIL, payload: error.message })
  }
}

export { addProduct, listProduct, deleteProduct, updateProduct, detailsProduct, ListProductByCategory }