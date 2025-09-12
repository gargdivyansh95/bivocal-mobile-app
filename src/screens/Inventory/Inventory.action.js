export const actionTypes = {
    GetSociety: '[Inventory] Get Society Action',
    PostPropertyImages: '[Inventory] Post Property Images Action',
    PostProperty: '[Inventory] Post Property Action',
    GetProperty: '[Inventory] Get Property Action',
  };

  export const inventoryActions = {
    getSociety: (payload, onSuccess, onError) => ({ type: actionTypes.GetSociety, payload, onSuccess, onError }),
    postPropertyImages: (payload, onSuccess, onError) => ({ type: actionTypes.PostPropertyImages, payload, onSuccess, onError }),
    postProperty: (payload, onSuccess, onError) => ({ type: actionTypes.PostProperty, payload, onSuccess, onError }),
    getProperty: (payload, onSuccess, onError) => ({ type: actionTypes.GetProperty, payload, onSuccess, onError }),
  };
