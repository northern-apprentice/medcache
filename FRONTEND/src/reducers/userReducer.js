import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE

} from '../actions/user/userActionConstants';

const initialState = {
    userData: null,
    isFetching: false,
    isError: false,
    error:''
  };
  
  const userReducer = (state = initialState, action) => {
      switch (action.type) {
        case LOGIN_USER_BEGIN:
          return Object.assign({}, state,{
            fetching: true,
            error:false
          });
        case LOGIN_USER_SUCCESS:
          return Object.assign({}, state,{
            user: action.payload,
            fetching: false,
            error:false
          });
        case LOGIN_USER_FAILURE:
          return Object.assign({}, state,{
            error: true,
            errorMsg: action.error,
            fetching: false
          });

        
        case LOGOUT_USER_BEGIN:
          return Object.assign({}, state,{
            fetching: true,
            error: false
          });
        case LOGOUT_USER_SUCCESS:
          return Object.assign({}, state,{
            user: null,
            fetching: false,
            error: false,
          });
        case LOGOUT_USER_FAILURE:
          return Object.assign({}, state,{
            error: true,
            errorMsg: action.error,
            fetching: false
          });

        default:
          return state;
      }
    };
  export default userReducer;
  