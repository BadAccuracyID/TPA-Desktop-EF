export const formatDate = (date: Date) => {
    // format date to YYYY-MM-DD HH:MM:SS
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}
