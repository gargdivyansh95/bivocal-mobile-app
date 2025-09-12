import { put, call, takeLatest } from 'redux-saga/effects';
import {
    requestPromise,
    createHeadersWithAuth,
    createFormDataHeadersWithAuth,
} from '../../util/request';
import { API_ENDPOINTS } from '../../constants/constants';
import { actionTypes } from './Inventory.action';

export function* getSocietyList(action) {
    let requestURL = API_ENDPOINTS.GETSOCIETY + '?filter=' + action.payload;
    let options = {};
    options.headers = createHeadersWithAuth();
    options.method = 'GET';

    try {
        const response = yield call(requestPromise, requestURL, options);
        if (response && response.isSuccess === true) {
            action.onSuccess(response);
        } else {
            action.onError(response);
        }
    } catch (error) {
        console.log('Saga Error get society List+++', error);
        action.onError({
            s: '500',
            m: 'Error while process your request!',
            log: error,
        });
    }
    return true;
}

export function* postPropertyImages(action) {
    let requestURL = API_ENDPOINTS.POSTPROPERTYIMAGES;
    let formdata = new FormData();
    console.log(action.payload, 'action.payload')
    formdata.append('file', {
        uri: action.payload.path,
        type: action.payload.mime,
        name: action.payload.filename,
    });
    let options = {};
    options.headers = createFormDataHeadersWithAuth();
    options.method = 'POST';
    options.body = formdata;

    try {
        const response = yield call(requestPromise, requestURL, options);
        if (response && response.isSuccess === true) {
            action.onSuccess(response);
        } else {
            action.onError(response);
        }
    } catch (error) {
        console.log('Saga Error get society List+++', error);
        action.onError({
            s: '500',
            m: 'Error while process your request!',
            log: error,
        });
    }
    return true;
}

export function* saga() {
    yield takeLatest(actionTypes.GetSociety, getSocietyList);
    yield takeLatest(actionTypes.PostPropertyImages, postPropertyImages);
}
