// export const API_ENDPOINT_BASE_URL = 'https://bvp-api.onrender.com/'; //dev
// export const API_ENDPOINT_BASE_URL = 'https://bvp-api-34j3.onrender.com/'// stage
export const API_ENDPOINT_BASE_URL = 'https://api.bivocalbirds.com/'; //prod
export const API_ENDPOINT_IMG_PREFIX = 'https://bivocalbirds.s3.us-east-2.amazonaws.com';
export const STAGE_IMAGE_URL = 'https://bivocalbirds-stage.s3.us-east-1.amazonaws.com';

export const BUILD_VARIANT = 'PRODUCTION';
export const APP_VERSION = '1.0.4(7)';

export const API_ENDPOINTS = {
  BASE: API_ENDPOINT_BASE_URL,
  LOGIN: API_ENDPOINT_BASE_URL + 'otp/send/91-<MOBILE_NUMBER>',
  VERIFY_OTP: API_ENDPOINT_BASE_URL + 'otp/Appverify/<DATA>',
  UPDATE_USER: API_ENDPOINT_BASE_URL + 'cp/update',
  OFFERS: API_ENDPOINT_BASE_URL + 'cp/offers',
  VISITLIST: API_ENDPOINT_BASE_URL + 'property-schedule/cpvisits',
  USER_PROFILE: API_ENDPOINT_BASE_URL + 'cp/user/detail',
  LOGOUT: API_ENDPOINT_BASE_URL + 'v1/api/logout',
  REFRESH_TOKEN: API_ENDPOINT_BASE_URL + 'cpuser/refresh-token/<REFRESH_TOKEN>',
  VISITLISTCOUNT: API_ENDPOINT_BASE_URL + 'app/property-schedule/count/status',
  NEEDQUERY: API_ENDPOINT_BASE_URL + 'lead/cpquery',
  GETSOCIETY: API_ENDPOINT_BASE_URL + '/society',
  POSTPROPERTYIMAGES: API_ENDPOINT_BASE_URL + '/property/cpProperty/upload',
  POSTPROPERTY: API_ENDPOINT_BASE_URL + '/property/cpProperty',
  GETPROPERTY: API_ENDPOINT_BASE_URL + '/property/cpProperty',
  UPDATEPROPERTY: API_ENDPOINT_BASE_URL + '/property/cpProperty/<PROPERTY_ID>',
  POSTRENTOUTPROPERTY: API_ENDPOINT_BASE_URL + '/property/cpProperty/rentOutReq',
};
