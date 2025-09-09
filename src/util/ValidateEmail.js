export default class ValidateEmail {

    isValid(emailString) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailString.match(mailformat)) {
            return true;
        }
        return false;
    }
}


export function isValidEmail(str) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (str.match(mailformat)) {
        return true;
    }
    return false;
}

