import {all} from 'redux-saga/effects';
// import * as auth from '../screens/Auth/Auth.saga';
// import * as visitList from '../screens/VisitList/VisitList.saga';
// import * as offers from '../screens/Offers/Offers.saga';
// import * as dashboard from '../screens/Dashboard/Dashboard.saga';
// import * as needQuery from '../screens/NeedQuery/NeedQuery.saga';

export function* rootSaga() {
  yield all([
    // auth.saga(),
    // visitList.saga(),
    // offers.saga(),
    // dashboard.saga(),
    // needQuery.saga(),
  ]);
}
