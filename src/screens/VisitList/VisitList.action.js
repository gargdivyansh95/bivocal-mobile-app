/* eslint-disable prettier/prettier */
export const actionTypes = {
  VisitList: '[Visit] Visit List Action',
  VisitListSuccess: '[Visit] Visit List Success Action',
  UserProfile: '[User] User Profile Action',
  UserProfileSuccess: '[User] User Profile Success Action',
  // NewNotification: '[Notification] New Notification Action',
};

export const visitListActions = {
  visitList: (payload, onSuccess, onError) => ({ type: actionTypes.VisitList, payload, onSuccess, onError }),
  visitListSuccess: payload => ({ type: actionTypes.VisitListSuccess, payload }),
  userProfile: (payload, onSuccess, onError) => ({ type: actionTypes.UserProfile, payload, onSuccess, onError }),
  userProfileSuccess: payload => ({ type: actionTypes.UserProfileSuccess, payload }),
  // newNotification: payload => ({ type: actionTypes.NewNotification, payload }),
}
