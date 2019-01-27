export function validateMonth(month) {
    if(Number.isInteger(month) === false) return false;
    if(month >= 1 && month <= 12) return true;
    else return false;
};