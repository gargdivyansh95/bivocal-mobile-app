export const actionTypes = {
    GetSociety: '[Inventory] Get Society Action',
  };

  export const inventoryActions = {
    getSociety: (payload, onSuccess, onError) => ({ type: actionTypes.GetSociety, payload, onSuccess, onError }),
  };
