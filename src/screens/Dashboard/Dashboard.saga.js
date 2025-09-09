/* eslint-disable prettier/prettier */
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestPromise,
  createHeadersWithAuth,
} from '../../util/request';
import { API_ENDPOINTS } from '../../constants/constants';
import { actionTypes, dashboardActions } from './Dashboard.action';

export function* getVisitListCount(action) {
  let requestURL = API_ENDPOINTS.VISITLISTCOUNT + '?where=' + action.payload;
  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'GET';

  try {
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      yield put(dashboardActions.visitListCountSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error get visit List+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;
}

export function* getUserProfile(action) {
  let requestURL = API_ENDPOINTS.USER_PROFILE;
  let options = {};
  options.headers = createHeadersWithAuth();

  options.method = 'GET';

  try {
    console.log(
      'Saga get user profile options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      yield put(dashboardActions.userProfileSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error get user profile+++', error);
    action.onError({
      s: '500',
      m: 'Error while process your request!',
      log: error,
    });
  }
  return true;
}

//SAGA

export function* saga() {
  yield takeLatest(actionTypes.VisitListCount, getVisitListCount);
  yield takeLatest(actionTypes.UserProfile, getUserProfile);
}
