import moment from 'moment';

export function formatDateFromRawString(date) {
    return moment(date).format("HH:mm:ss, DD.MM.YYYY");
};

export function formatDateToStringDateWithoutTime(date) {
    return moment(date).format("DD.MM.YYYY");
}

export function formatStringDateWithTimeToFullDate(date) {
    return moment(date, "HH:mm:ss, DD.MM.YYYY").toDate();
}

export function formatStringDateToFullDate(date) {
    return moment(date, "DD.MM.YYYY").toDate();
}