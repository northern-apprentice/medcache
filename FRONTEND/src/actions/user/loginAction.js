import axios from 'axios';
import {BASE_API_URL} from '../../config/config';
import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE
} from './userActionConstants';



const user_login_begin = () => {
  return {
    type: LOGIN_USER_BEGIN
  };
};

const user_login_success = (payload) => {
  console.log("login success");
  return {
    type: LOGIN_USER_SUCCESS,
    payload: payload
  };
};


const user_login_failure = (err) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: null,
    error: err
  };
};


export const login = (data, header, navigation) => {
  console.log(data);
  return dispatch => {
    dispatch(user_login_begin());
    console.log(BASE_API_URL);
    console.log(header);
    axios.post(BASE_API_URL + "users/login",data, header)
      .then((res) => {
        
        console.log(res);
        if (res.data.valid){
          dispatch(user_login_success(res.data));
          navigation.navigate('Home');
        }
        if (!res.data.valid){
          dispatch(user_login_invalid(res.data));
        }
      })
      .catch((err) => {
        console.log("post error");
        console.log(err);
        dispatch(user_login_failure(err));
      });
  };
};

  const user_logout = () => {
    return {
      type: LOGOUT_USER_BEGIN
    };
  };
  
  const user_logout_success = (payload) => {
    return {
      type: LOGOUT_USER_SUCCESS,
      payload: payload
    };
  };
  
  const user_logout_failure = (err) => {
    return {
      type: LOGOUT_USER_FAILURE,
      payload: payload,
      error: err
    };
  };

  export const logout = (data, header, navigation) => {
    return dispatch => {
      dispatch(user_logout());
      axios.post(BASE_URL + "logout",data, header)
        .then(res => {
          if (res.status=200){
            dispatch(user_logout_success(res.data));
            navigation.navigate('Login');
          }
          if (res.status != 200){
              dispatch(user_logout_failure(res.data))
          }
        })
        .catch(err => {
          dispatch(user_logout_failure(err));
        });
    };
  };
  