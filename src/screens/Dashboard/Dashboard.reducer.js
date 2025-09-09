/* eslint-disable prettier/prettier */
import { persistReducer } from 'redux-persist';
import { storage } from '../../storage';
import { actionTypes } from './Dashboard.action';

const initialState = {
  visitListCount: undefined,
  userProfileData: undefined,
  notificationPayload: undefined,
};

export const getKeyName = () => {
  return 'V001' + '-module-visitListCount';
};

export const dashboardReducer = persistReducer(
  {
    storage,
    key: getKeyName(),
    whitelist: ['visitListCount, userProfileData'],
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.VisitListCountSuccess:
        console.log('VisitListCount Reducer', action.payload);
        return {
          ...state,
          visitListCount: action.payload,
        };
      case actionTypes.UserProfileSuccess:
        console.log('User Profile Reducer', action.payload);
        return {
          ...state,
          userProfileData: action.payload,
        };
      case actionTypes.NewNotification:
        console.log('NewNotification Reducer', action.payload);
        return {
          ...state,
          notificationPayload: action.payload,
        };
      default:
        return state;
    }
  },
);
