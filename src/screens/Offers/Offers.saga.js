/* eslint-disable prettier/prettier */
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  requestPromise,
  createQueryString,
  createHeaders,
  createHeadersWithAuth,
} from '../../util/request';
import { actionTypes, offersActions } from './Offers.action';
import { API_ENDPOINTS } from '../../constants/constants';
import { getToken } from '../../util/helpers';

export function* postOffersList(action) {
  let requestURL = API_ENDPOINTS.OFFERS;
  let options = {};
  options.headers = createHeadersWithAuth();

  options.method = 'GET';
  //   options.body = JSON.stringify(action.payload);

  try {
    console.log(
      'Saga get offers List options +++',
      requestURL,
      options,
    );
    const response = yield call(requestPromise, requestURL, options);

    if (response && response.isSuccess === true) {
      yield put(offersActions.offersListSuccess(response, options.method));
      action.onSuccess(response);
    } else {
      action.onError(response);
    }
  } catch (error) {
    console.log('Saga Error get offers List+++', error);
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
  yield takeLatest(actionTypes.OffersList, postOffersList);
}
