/* eslint-disable prettier/prettier */
export const actionTypes = {
    VisitListCount: '[VisitCount] Visit List Count Action',
    VisitListCountSuccess: '[VisitCount] Visit List Count Success Action',
    UserProfile: '[User] User Profile Action',
    UserProfileSuccess: '[User] User Profile Success Action',
    NewNotification: '[Notification] New Notification Action',
  };

  export const dashboardActions = {
    visitListCount: (payload, onSuccess, onError) => ({ type: actionTypes.VisitListCount, payload, onSuccess, onError }),
    visitListCountSuccess: payload => ({ type: actionTypes.VisitListCountSuccess, payload }),
    userProfile: (payload, onSuccess, onError) => ({ type: actionTypes.UserProfile, payload, onSuccess, onError }),
    userProfileSuccess: payload => ({ type: actionTypes.UserProfileSuccess, payload }),
    newNotification: payload => ({ type: actionTypes.NewNotification, payload }),
  };
