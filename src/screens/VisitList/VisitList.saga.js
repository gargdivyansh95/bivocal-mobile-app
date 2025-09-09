/* eslint-disable prettier/prettier */
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestPromise,
  createQueryString,
  objectToQueryParams,
  createHeadersWithAuth,
} from '../../util/request';
import { actionTypes, visitListActions } from './VisitList.action';
import { API_ENDPOINTS } from '../../constants/constants';
import { getToken } from '../../util/helpers';

export function* getVisitList(action) {
  let requestURL = API_ENDPOINTS.VISITLIST + '?filter=' + action.payload;
  let options = {};
  options.headers = createHeadersWithAuth();

  options.method = 'GET';
  //   options.body = JSON.stringify(action.payload);

  try {
    console.log(
      'Saga get visit List options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      yield put(visitListActions.visitListSuccess(response, options.method));
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
      yield put(visitListActions.userProfileSuccess(response, options.method));
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
  yield takeLatest(actionTypes.VisitList, getVisitList);
  yield takeLatest(actionTypes.UserProfile, getUserProfile);
}
