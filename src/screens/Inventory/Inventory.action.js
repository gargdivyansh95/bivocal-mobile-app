export const actionTypes = {
    GetSociety: '[Inventory] Get Society Action',
    PostPropertyImages: '[Inventory] Post Property Images Action',
  };

  export const inventoryActions = {
    getSociety: (payload, onSuccess, onError) => ({ type: actionTypes.GetSociety, payload, onSuccess, onError }),
    postPropertyImages: (payload, onSuccess, onError) => ({ type: actionTypes.PostPropertyImages, payload, onSuccess, onError }),
  };
