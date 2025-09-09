/* eslint-disable prettier/prettier */
import { persistReducer } from 'redux-persist';
import { storage } from '../../storage';
import { actionTypes } from './Offers.action';

const initialState = {
  offersListData: undefined,
};

export const getKeyName = () => {
  return 'V001' + '-module-offers';
};

export const offersReducer = persistReducer(
  {
    storage,
    key: getKeyName(),
    whitelist: ['offersListData'],
  },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.OffersListSuccess:
        console.log('OffersList Reducer', action.payload);
        return {
          ...state,
          offersListData: action.payload,
        };

      default:
        return state;
    }
  },
);
