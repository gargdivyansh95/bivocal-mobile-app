/* eslint-disable prettier/prettier */
import { persistReducer } from 'redux-persist';
import { storage } from '../../storage';
import { actionTypes } from './Auth.action';

const initialState = {
  token: undefined,
  userProfile: undefined,
  appInstalled: undefined,
  deviceId: undefined
};

export const getKeyName = () => {
  return 'V001' + '-module-auth';
};

export const authReducer = persistReducer(
  {
    storage,
    key: getKeyName(),
    whitelist: ['token', 'userProfile', "appInstalled", "deviceId"],
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LoginSuccess:
        console.log('Login Success Reducer', action.payload);
        return {
          ...state,
          userProfile: action.payload,
          token: action.payload.data.token
        };

      case actionTypes.UserDetailSuccess:
        console.log('User Detail Success Reducer', action.payload);
        if (action.payload && action.payload.status === 200) {
          return { ...state, userProfile: action.payload.user };
        } else {
          return { ...state, userProfile: null };
        }

      case actionTypes.RefreshTokenSuccess:
        console.log('RefreshToken Success Reducer', action.payload);
        return {
          ...state,
          token: action.payload.data,
        };

      case actionTypes.LogoutSuccess: {
        console.log(action.type, 'clearing state...');
        return { ...state, ...initialState, token: undefined, userProfile: undefined, appInstalled: true };
      }

      case actionTypes.AppInstalled: {
        console.log(action.type, 'clearing state...');
        return { ...state, appInstalled: true };
      }

      case actionTypes.SaveDeviceId: {
        console.log(action.type, 'SaveDeviceId');
        console.log(action.payload, 'SaveDeviceId');
        return { ...state, deviceId: action.payload };
      }

      default:
        return state;
    }
  },
);
