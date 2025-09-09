/* eslint-disable prettier/prettier */
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestPromise,
  createQueryString,
  createHeaders,
  createHeadersWithAuth,
} from '../../util/request';
import { actionTypes, authActions } from './Auth.action';
import { API_ENDPOINTS } from '../../constants/constants';
import { getToken } from '../../util/helpers';

/*
 * Login Saga with username & password
 */
export function* postLogin(action) {
  console.log(action, 'SAGA PostLogin');
  let requestURL = API_ENDPOINTS.LOGIN.replace('<MOBILE_NUMBER>', action.payload);

  let options = {};
  options.headers = createHeaders();

  options.method = 'GET';
  //   options.body = JSON.stringify(action.payload);

  try {
    // const { email, password } = action.payload;
    console.log(
      'Saga postLogin options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);
    console.log('SAGA postLogin After Yield Response +++', response);

    //if login success then fetch user details and then forward to login success
    if (response && response.isSuccess === true) {
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error postLogin+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;

}

export function* postVerifyOTP(action) {
  let requestURL = API_ENDPOINTS.VERIFY_OTP.replace('<DATA>', action.payload);
  let options = {};
  options.headers = createHeaders();

  options.method = 'GET';
  //   options.body = JSON.stringify(action.payload);

  try {
    // const { email, password } = action.payload;
    console.log(
      'Saga postVerifyOTP options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      yield put(authActions.loginSuccess(response, options.method));
      action.onSuccess(response);
      //   yield put(actions.userDetail(response, null, null));
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error postVerifyOTP+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;
}

export function* postUpdateUser(action) {
  let requestURL = API_ENDPOINTS.UPDATE_USER;
  let options = {};
  options.headers = createHeadersWithAuth();

  options.method = 'PATCH';
  options.body = JSON.stringify(action.payload);
  try {
    console.log(
      'Saga postUpdateUser options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      // yield put(authActions.loginSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error postUpdateUser+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;
}

export function* postRefreshToken(action) {
  let requestURL = API_ENDPOINTS.REFRESH_TOKEN.replace('<REFRESH_TOKEN>', action.payload.refreshToken);
  let options = {};
  options.headers = createHeadersWithAuth()

  options.method = 'GET';

  try {
    // const { email, password } = action.payload;
    console.log('Saga postRefreshToken options +++', requestURL, options);
    const response = yield call(requestPromise, requestURL, options);
    console.log('Saga resp postRefreshToken+++', response);
    if (response && response.isSuccess === true) {
      yield put(authActions.reafreshTokenSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error postRefreshToken+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;
}

/*
 * Forget Password Saga with email
 */
// export function* postForgetPassword(action) {
//   console.log(action, 'SAGA postForgetPassword');
//   let requestURL = API_ENDPOINTS.FORGET_PASSWORD;

//   let options = {};
//   options.headers = {
//     'Content-type': 'application/json; charset=UTF-8',
//   };

//   options.method = 'POST';

//   try {
//     const queryString = createQueryString(action.payload.get);
//     requestURL = `${requestURL}?${queryString}`;
//     // console.log("Saga postForgetPassword payload +++", action.payloa);
//     options.body = JSON.stringify(action.payload.post);
//     options.dataType = 'json';

//     // const { email, password } = action.payload;
//     console.log(
//       'Saga postForgetPassword options +++',
//       requestPromise,
//       requestURL,
//       options,
//     );
//     const response_submit = yield call(requestPromise, requestURL, options);
//     console.log(
//       'SAGA postForgetPassword After Yield Response +++',
//       response_submit,
//     );

//     //if login success then fetch user details and then forward to login success
//     if (response_submit && response_submit.s === '200') {
//       action.onSuccess(response_submit);
//     } else {
//       action.onError(response_submit);
//     }
//   } catch (error) {
//     console.log('Saga Error postForgetPassword+++', error);
//     // Tracker.event("AUTH", "login", "login-failed") //@TEMP-HIDE
//     action.onError({s: '500', m: 'Login failed!', log: error});
//   }
//   return true;
// }

/*
 * User Details Saga
 */
// export function* postUserDetail(action) {
//   console.log(action, 'SAGA postUserDetail');
//   let requestURL = API_ENDPOINTS.PROFILE;
//   let options = {};
//   options.headers = createHeadersWithAuth();
//   options.method = 'POST';

//   try {
//     console.log(
//       'Saga postUserDetail options +++',
//       requestPromise,
//       requestURL,
//       options,
//     );
//     const response = yield call(requestPromise, requestURL, options);
//     console.log('SAGA postUserDetail After Yield Response +++', response);

//     //if login success then fetch user details and then forward to login success
//     if (response && response.status === 200) {
//       yield put(actions.userDetailSuccess(response, options.method));
//       //action.onSuccess(response.data);
//     } else {
//       //action.onError(response);
//     }
//   } catch (error) {
//     console.log('Saga Error postUserDetail+++', error);
//     // Tracker.event("AUTH", "login", "login-failed") //@TEMP-HIDE
//     //action.onError({ s: '500', m: "Unable to fetch details!", log: error });
//   }
//   return true;
// }

/*
 * User Logout Saga
 */
export function* postLogout(action) {
  yield put(authActions.logoutSuccess({}, ''));
  return true;
}

//SAGA

export function* saga() {
  yield takeLatest(actionTypes.Login, postLogin);
  yield takeLatest(actionTypes.VerifyOTP, postVerifyOTP);
  yield takeLatest(actionTypes.UpdateUser, postUpdateUser);
  yield takeLatest(actionTypes.RefreshToken, postRefreshToken);

  // yield takeLatest(actionTypes.UserDetail, postUserDetail);
  // yield takeLatest(actionTypes.ForgetPassword, postForgetPassword);
  yield takeLatest(actionTypes.Logout, postLogout);
}
