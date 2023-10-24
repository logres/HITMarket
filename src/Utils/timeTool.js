export const changeTimeShow = (time) => {
    if (!time) return '';
    const date = new Date(time + '+0800')
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${year}-${month}-${day} ${hour > 9 ? hour : '0' + hour}:${minute > 9 ? minute : '0' + minute}`;
}