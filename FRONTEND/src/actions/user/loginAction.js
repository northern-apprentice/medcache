import axios from 'axios';
import {BASE_URL} from '../../config/config';
import {
    LOGIN_USER_BEGIN,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE
} from './userActionConstants';

console.log(BASE_URL);
console.log(LOGIN_USER_BEGIN);
console.log(LOGIN_USER_SUCCESS);

const user_login_begin = () => {
  return {
    type: LOGIN_USER_BEGIN
  };
};

const user_login_success = (payload) => {
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
  
  return dispatch => {
    dispatch(user_login_begin());
    axios.post(BASE_URL + "login",data, header)
      .then((res) => {
        if (res.data.valid){
          dispatch(user_login_success(res.data));
          navigation.navigate('Home');
        }
        if (!res.data.valid){
          dispatch(user_login_invalid(res.data));
        }
      })
      .catch((err) => {
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
  