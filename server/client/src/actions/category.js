import { CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL,
         CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL, 
         CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_FAIL, 
         CATEGORY_UPDATE_REQUEST, CATEGORY_UPDATE_SUCCESS, CATEGORY_UPDATE_FAIL, 
         CATEGORY_LIST_BY_NAME_REQUEST, CATEGORY_LIST_BY_NAME_SUCCESS, CATEGORY_LIST_BY_NAME_FAIL } from "../constants/category"

const { default: Axios } = require("axios")

const addCategory = (name,url, details) => async (dispatch,getState)=>{
    dispatch({type:CATEGORY_ADD_REQUEST,payload:{name,url, details}})
    try {
        const { userSignin: { userInfo } } = getState();

        const {data} = await Axios.post('/category',{name,url, details},{
          headers: {
            Authorization: ' Bearer ' + userInfo.token
          }
        })

        dispatch({type:CATEGORY_ADD_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CATEGORY_ADD_FAIL,payload:error.message})
    }
}

const updateCategory = (id,name, details) => async (dispatch, getState)=>{
    dispatch({type:CATEGORY_UPDATE_REQUEST,payload:{id,name, details}})
    try {
        const {userSignin:{userInfo}} = getState()
        const {data} = await Axios.put('/category/'+id,{name, details},{
          headers:{
            Authorization: "Bearer "+userInfo.token
          }
        })
        dispatch({type:CATEGORY_UPDATE_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:CATEGORY_UPDATE_FAIL,payload:error.message})
    }
}

const listCategory =() => async (dispatch)=>{
    try {
        dispatch({type:CATEGORY_LIST_REQUEST})
        const {data} = await Axios.get('/category')
        dispatch({type:CATEGORY_LIST_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:CATEGORY_LIST_FAIL, payload:error.message})
    }
}

const deleteCategory = (id) => async (dispatch, getState) =>{
    try {
      dispatch({type:CATEGORY_DELETE_REQUEST,payload: id})
      const {userSignin: {userInfo}} = getState()
      const {data} = await Axios.delete('/category/'+id,{
        headers:{
          Authorization: "Bearer "+userInfo.token
        }
      })
      dispatch({type:CATEGORY_DELETE_SUCCESS, payload:data, success:true})
    } catch (error) {
      dispatch({type:CATEGORY_DELETE_FAIL, payload:error.message})
    }
  }

  const ListCategoryByName = (catName) => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_BY_NAME_REQUEST, payload: catName })
      const { data } = await Axios.get('/categoryList/'+catName)
      dispatch({ type:CATEGORY_LIST_BY_NAME_SUCCESS , payload: data })
    } catch (error) {
      dispatch({ type: CATEGORY_LIST_BY_NAME_FAIL, payload: error.message })
    }
  }

export {addCategory, listCategory, deleteCategory,updateCategory, ListCategoryByName}