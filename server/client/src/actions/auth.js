import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
    ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST, USER_LOGOUT, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL } from "../constants/auth";

    
const signinAdmin = (email, password)=> async (dispatch)=> {
  dispatch({type:  ADMIN_SIGNIN_REQUEST, payload:{email,password}})
  try {
      const {data} = await Axios.post('/adminSignin', {email,password})
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
      Cookie.set('adminInfo', JSON.stringify(data));
  } catch (error) {
      dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message });
  }
}

const signin = (email, password)=> async (dispatch)=> {
        dispatch({type:  USER_SIGNIN_REQUEST, payload:{email,password}})
        try {
            const {data} = await Axios.post('/signin', {email,password})
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
            Cookie.set('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
        }
  }

const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/signup", { name, email, password });
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
    }
}

const resetPassword = (email) => async (dispatch) => {
  dispatch ({type: RESET_PASSWORD_REQUEST, payload:{email}})
  try {
    const {data} = await Axios.post('/reset-password', {email})
    dispatch ({type: RESET_PASSWORD_SUCCESS, payload:data})

  } catch (error) {
    dispatch ({type: RESET_PASSWORD_FAIL, payload:error.message})
  }
}

const confirmPassword = (password,token) => async (dispatch) => {
  dispatch ({type: NEW_PASSWORD_REQUEST, payload:{password, token}})
  try {
    const {data} = await Axios.post('/new-password', {password, token})
    dispatch ({type: NEW_PASSWORD_SUCCESS, payload:data})

  } catch (error) {
    dispatch ({type: NEW_PASSWORD_FAIL, payload:error.message})
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

export {signin, signup, signinAdmin, resetPassword, confirmPassword, logout}