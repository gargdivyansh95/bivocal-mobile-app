/* eslint-disable prettier/prettier */
export const actionTypes = {
    OffersList: '[Offers] Offers List Action',
    OffersListSuccess: '[Offers] Offers List Success Action',
  };

  export const offersActions = {
    offersList: (payload, onSuccess, onError) => ({
      type: actionTypes.OffersList,
      payload,
      onSuccess,
      onError,
    }),
    offersListSuccess: payload => ({type: actionTypes.OffersListSuccess, payload}),
}