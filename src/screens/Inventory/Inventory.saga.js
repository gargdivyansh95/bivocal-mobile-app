import { put, call, takeLatest } from 'redux-saga/effects';
import {
    requestPromise,
    createHeadersWithAuth,
    createFormDataHeadersWithAuth,
} from '../../util/request';
import { API_ENDPOINTS } from '../../constants/constants';
import { actionTypes } from './Inventory.action';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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
        console.log('Saga Error post image+++', error);
        action.onError({
            s: '500',
            m: 'Error while process your request!',
            log: error,
        });
    }
    return true;
}

export function* postProperty(action) {
    let requestURL = API_ENDPOINTS.POSTPROPERTY;
    let options = {};
    options.headers = createHeadersWithAuth();
    options.method = 'POST';
    options.body = JSON.stringify(action.payload);
    try {
        const response = yield call(requestPromise, requestURL, options);
        if (response && response.isSuccess === true) {
            action.onSuccess(response);
        } else {
            action.onError(response);
        }
    } catch (error) {
        console.log('Saga Error post property+++', error);
        action.onError({
            s: '500',
            m: 'Error while process your request!',
            log: error,
        });
    }
    return true;
}

export function* getPropertyList(action) {
    let requestURL = API_ENDPOINTS.GETPROPERTY + '?filter=' + action.payload;
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
        console.log('Saga Error get property List+++', error);
        action.onError({
            s: '500',
            m: 'Error while process your request!',
            log: error,
        });
    }
    return true;
}

export function* postUpdateProperty(action) {
    let requestURL = API_ENDPOINTS.UPDATEPROPERTY.replace('<PROPERTY_ID>', action.payload.propertyId);
    let options = {};
    options.headers = createHeadersWithAuth();
    options.method = 'PATCH';
    options.body = JSON.stringify(action.payload.obj);
    try {
        const response = yield call(requestPromise, requestURL, options);
        if (response && response.isSuccess === true) {
            action.onSuccess(response);
        } else {
            action.onError(response);
        }
    } catch (error) {
        console.log('Saga Error postUpdateProperty+++', error);
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
    yield takeLatest(actionTypes.PostProperty, postProperty);
    yield takeLatest(actionTypes.GetProperty, getPropertyList);
    yield takeLatest(actionTypes.UpdateProperty, postUpdateProperty);
}
