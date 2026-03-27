import { store } from '../store';
import moment from 'moment';

export function getToken() {
    const {
        auth: { authToken },
    } = store.getState();
    return authToken;
}

export function isUserLoggedIn() {
    const {
        auth: { userProfile },
    } = store.getState();

    return userProfile;
}

export function isAppInstalled() {
    const {
        auth: { appInstalled },
    } = store.getState();

    return appInstalled;
}


export function getCurrentTenantId() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.current_tenant_id : null;
}


export function getCurrentBranchId() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.current_branch_id : null;
}


export function getCurrentProfileId() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.current_profile_id : null;
}


export function getCurrentBranchName() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.current_branch_name : null;
}

export function getHomeConsultationCharges() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? parseFloat(loginDetails.home_consultation_charges) : 0;
}

export function getHomeConsultationMaxCharges() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? parseFloat(loginDetails.home_consultation_max_charges) : 0;
}

export function getCurrencySymbol() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.currency_symbol : '';
}

export function getFormatDecimal() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.format_decimal : '2';
}

export function getBranchAddress() {
    const {
        auth: { loginDetails },
    } = store.getState();
    return loginDetails ? loginDetails.branch_address : null;
}


export function getSlnId() {
    const {
        orders: { sln_id },
    } = store.getState();
    return sln_id;
}

export function getRpId() {
    const {
        orders: { rp_id },
    } = store.getState();
    return rp_id;
}


export function getOrderKey() {
    const {
        auth: { user },
    } = store.getState();
    return user ? user.SESSION_ID + '_' + Date.now() : getToken();
}

export function getNotificationToken() {
    // console.log("Util Helpers getAuthToken+++");
    // const authToken = useSelector(getAuthToken);
    // state.auth.authToken
    const {
        auth: { notificationToken },
    } = store.getState();

    // console.log("Util Helpers getAuthToken :", authToken);

    return notificationToken;
}

export function isLoggedIn() {
    const {
        auth: { user },
    } = store.getState();

    console.log('Util Helpers isLoggedIn', user);

    return (user !== null && user !== undefined) ? true : false;
}

export function getUser() {
    const {
        auth: { user },
    } = store.getState();

    return user;
}


export function formatNumber(value) {
    let temp = parseFloat('' + value);
    let formatted_number = 0;

    if (!isNaN(temp)) {
        formatted_number = temp;
    }
    // console.log("formatNumber+++", value, temp, formatted_number);
    return formatted_number.toFixed(getFormatDecimal());
}

export function getTime(date) {
    let result = moment(date).fromNow();
    const now = moment();
    const days = now.diff(date, 'days');
    const weeks = now.diff(date, 'weeks');
    if (days >= 7) {
        if (days <= 13) {
            result = 'a week ago';
        } else if (days > 13 && days <= 25) {
            result = `${weeks} weeks ago`;
        }
    }
    return result;
}

export function getFormatedDate(str) {
    return moment(str).format('MMM DD, YYYY');
}

export function isValidName(name) {
    if (!name) {
        return false
    }
    const regex = /^[A-Za-z]+$/;
    return regex.test(name.trimEnd());
}

export function isValidEmail(email) {
    if (!email) {
        return false
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email.trim());
}

export function isValidIndianMobile(mobile) {
    if (!mobile) {
        return false
    }
    const regex = /^[6-9]\d{9}$/;
    return regex.test(mobile);
}


