/* eslint-disable prettier/prettier */
export const actionTypes = {
    NeedQuery: '[Contact] NeedQuery Action',
  };

  export const needQueryActions = {
    needQuery: (payload, onSuccess, onError) => ({ type: actionTypes.NeedQuery, payload, onSuccess, onError }),
  };
