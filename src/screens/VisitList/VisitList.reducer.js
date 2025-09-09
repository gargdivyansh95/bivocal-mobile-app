/* eslint-disable prettier/prettier */
import { persistReducer } from 'redux-persist';
import { storage } from '../../storage';
import { actionTypes } from './VisitList.action';

const initialState = {
  visitList: undefined,
  userProfileData: undefined,
  // notificationPayload: undefined
};

export const getKeyName = () => {
  return 'V001' + '-module-visitList';
};

export const visitListReducer = persistReducer(
  {
    storage,
    key: getKeyName(),
    whitelist: ['visitList', 'userProfileData'],
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.VisitListSuccess:
        console.log('VisitList Reducer', action.payload);
        return {
          ...state,
          visitList: action.payload,
        };
      case actionTypes.UserProfileSuccess:
        console.log('User Profile Reducer', action.payload);
        return {
          ...state,
          userProfileData: action.payload,
        };
      // case actionTypes.NewNotification:
      //   console.log('NewNotification Reducer', action.payload);
      //   return {
      //     ...state,
      //     notificationPayload: action.payload,
      //   };
      default:
        return state;
    }
  },
);
