
// import axios from 'axios';
// import {BASE_URL, requestHeaders, BASE_ROUTE} from '../configs/react.configs';
// import {
//     REGISTER_USER_BEGIN,
//     REGISTER_USER_SUCCESS,
//     REGISTER_USER_FAILURE

// } from './userActionConstants'

// const user_login_begin = () => {
//   return {
//     type: REGISTER_USER_BEGIN
//   };
// };

// const user_login_success = () => {
//   return {
//     type: REGISTER_USER_SUCCESS,
//   };
// };


// const user_login_failure = (payload) => {
//   return {
//     type: REGISTER_USER_FAILURE,
//     user: payload
//   };
// };


// export const login = (data, header, navigation) => {
//   return dispatch => {
//     dispatch(user_login_begin());
//     axios.post(BASE_URL + "login",data, header)
//       .then((res) => {
//         if (res.data.valid){
//           dispatch(user_login_success(res.data));
//           navigation.navigate('Home');
//         }
//         if (!res.data.valid){
//           dispatch(user_login_invalid(res.data));
//         }
//       })
//       .catch((err) => {
//         dispatch(user_login_failure(err));
//       });
//   };
// };

//   const user_logout = () => {
//     return {
//       type: LOGOUT_USER_BEGIN
//     };
//   };
  
//   const user_logout_success = (payload) => {
//     return {
//       type: LOGOUT_USER_SUCCESS,
//       user: payload
//     };
//   };
  
//   const user_logout_failure = (err) => {
//     return {
//       type: 'LOGIN_USER_FAILURE',
//       user: payload,
//       error: err
//     };
//   };

//   export const register = (data, header, navigation) => {
//     return dispatch => {
//       dispatch(user_logout());
//       axios.post(BASE_URL + "logout",data, header)
//         .then(res => {
//           if (res.status=200){
//             dispatch(user_logout_success(res.data));
//             navigation.navigate('Login');
//           }
//           if (res.status != 200){
//               dispatch(user_logout_failure(res.data))
//           }
//         })
//         .catch(err => {
//           dispatch(user_logout_failure(err));
//         });
//     };
//   };
  