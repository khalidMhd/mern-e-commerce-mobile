import { USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS } from "../constants/profile"

const { default: Axios } = require("axios")

const profileUser = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: USER_PROFILE_REQUEST,payload:id })
      const { userSignin: { userInfo } } = getState();

      const { data } = await Axios.get('/profile/'+ id,{
        headers: {
          Authorization: ' Bearer ' + userInfo.token
        }
      })
      dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
  
    } catch (error) {
      dispatch({ type: USER_PROFILE_FAIL, payload: error.message })
    }
  }

  export {profileUser}