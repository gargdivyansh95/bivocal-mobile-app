/* eslint-disable prettier/prettier */
export const actionTypes = {
  Login: '[Auth] Login Action',
  VerifyOTP: '[Auth] Verify OTP Action',
  LoginSuccess: '[Auth] Login Success Action',
  UpdateUser: '[Auth] Update User',
  RefreshToken: '[Auth] RefreshToken',
  RefreshTokenSuccess: '[Auth] RefreshToken Success',
  Logout: '[Auth] Logout Action',
  LogoutSuccess: '[Auth] Logout Success Action',
  ForgetPassword: '[Auth] ForgetPassword Action',
  UserDetail: '[Auth] UserDetail Action',
  UserDetailSuccess: '[Auth] UserDetail Success Action',
  LoginDetailsSuccess: '[Auth] Login Detail Success Action',
  NotificationTokenSuccess: '[Auth] Notification Token Success Action',
  PushRegister: '[Auth] Push Register Action',
  SaveDeviceId: '[SaveDeviceId] SaveDeviceId Action',
  AppInstalled: '[AppInstalled] AppInstalled Action'
};

export const authActions = {
  login: (payload, onSuccess, onError) => ({ type: actionTypes.Login, payload, onSuccess, onError }),

  verifyOTP: (payload, onSuccess, onError) => ({ type: actionTypes.VerifyOTP, payload, onSuccess, onError }),

  loginSuccess: payload => ({ type: actionTypes.LoginSuccess, payload }),
  updateUser: (payload, onSuccess, onError) => ({ type: actionTypes.UpdateUser, payload, onSuccess, onError }),
  logoutSuccess: () => ({ type: actionTypes.LogoutSuccess }),
  reafreshToken: (payload, onSuccess, onError) => ({ type: actionTypes.RefreshToken, payload, onSuccess, onError }),
  reafreshTokenSuccess: payload => ({ type: actionTypes.RefreshTokenSuccess, payload }),

  forgetPassword: (payload, onSuccess, onError) => ({ type: actionTypes.ForgetPassword, payload, onSuccess, onError }),

  // logout: payload => ({type: actionTypes.Logout}),

  userDetail: (payload, onSuccess, onError) => ({ type: actionTypes.UserDetail, payload, onSuccess, onError }),
  userDetailSuccess: payload => ({ type: actionTypes.UserDetailSuccess, payload }),
  notificationTokenSuccess: payload => ({ type: actionTypes.NotificationTokenSuccess, payload, }),
  pushRegister: payload => ({ type: actionTypes.PushRegister, payload }),
  loginDetailSuccess: payload => ({ type: actionTypes.LoginDetailsSuccess, payload }),
  saveDeviceId: payload => ({ type: actionTypes.SaveDeviceId, payload }),
  appInstalled: payload => ({ type: actionTypes.AppInstalled, payload }),
};
