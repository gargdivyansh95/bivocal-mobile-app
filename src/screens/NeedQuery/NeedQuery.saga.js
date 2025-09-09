/* eslint-disable prettier/prettier */
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestPromise,
  createHeadersWithAuth,
} from '../../util/request';
import { API_ENDPOINTS } from '../../constants/constants';
import { actionTypes } from './NeedQuery.action';

export function* postNeedQuery(action) {
    console.log('action----------------------------------', action.payload)
  let requestURL = API_ENDPOINTS.NEEDQUERY;
  let options = {};
  options.headers = createHeadersWithAuth();
  options.method = 'POST';
  options.body = JSON.stringify(action.payload);

  try {
    console.log(
      'Saga get contact us options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      // yield put(dashboardActions.userProfileSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error get contact us+++', error);
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
  yield takeLatest(actionTypes.NeedQuery, postNeedQuery);
}
