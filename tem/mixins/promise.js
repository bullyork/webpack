var ComparePromise = function(flag, passValue) {
    return new Promise(function(resolve, reject) {
        if (flag === true) {
            resolve(passValue);
        } else {
            reject(new Error("Return value is invalid"))
        }
    })
}

var MustTruePromise = function(value, passValue) {
    let flag = value === true;
    if (!flag && typeof value === "string") {
        flag = value.toUpperCase() === "TRUE";
    }
    return ComparePromise(flag, passValue);
}

var MustNotEmptyPromise = function(value, passValue) {
    return ComparePromise(value === "", passValue)
}

var Mixin = {
    mustTrue: MustTruePromise,
    mustNotEmpty: MustNotEmptyPromise,
    mustFlag: ComparePromise,
}
export default Mixin;
