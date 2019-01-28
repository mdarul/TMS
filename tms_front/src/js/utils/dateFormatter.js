import moment from 'moment';

export function formatDateFromRawString(date) {
    console.log(moment(date));
    // console.log(moment(date, ""))
    return moment(date).format("HH:mm:ss, DD.MM.YYYY");
};