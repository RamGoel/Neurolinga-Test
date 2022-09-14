var errors = []


function validateEmailPassword(p, emailString) {

    var atSymbol = emailString.indexOf("@");
    var dot = emailString.indexOf(".");

    if (dot <= atSymbol + 2 || atSymbol < 1) {
        if (dot == emailString.length - 1) {
            errors.push("Enter Valid Email Address");
        }
        else {
            errors.push("Check your Email")
        }
    }

    if (p.length < 8) errors.push("Your password must   be at least 8 characters");

    if (p.search(/[a-z]/i) < 0) errors.push("Your password must contain at least one letter.");

    if (p.search(/[0-9]/) < 0) errors.push("Your password must contain at least one digit.");

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const baseURL='https://localhost:3000'
export {
    validateEmailPassword,
    makeid,
    baseURL
}