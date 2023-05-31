export const formatDate = (date: Date) => {
    // format date to YYYY-MM-DD HH:MM:SS
    return date.getFullYear() + '-' + month(date) + '-' + day(date) + ' ' + hours(date) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

function month(date: Date) {
    let month = date.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}

function day(date: Date) {
    let day = date.getDate();
    return day < 10 ? '0' + day : day;
}

function hours(date: Date) {
    let hours = date.getHours();
    return hours < 10 ? '0' + hours : hours;
}

export const toDateFromSeconds = (seconds: number) => {
    return new Date(seconds * 1000);
}
