const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'

]


function compareDate(inputDate) {
    const now = new Date();
    const givenDate = new Date(inputDate);

    now.setHours(0, 0, 0, 0);
    givenDate.setHours(0, 0, 0, 0);

    if (givenDate < now) {
        return 'PAST';
    } else if (givenDate > now) {
        return 'FUTURE';
    } else {
        return 'TODAY';
    }
}
export default compareDate


export const GetDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = monthName[dateObject.getMonth() + 1]
    const day = dateObject.getDate();

    const dateStr = `${day} ${month} , ${year}`
    return dateStr;

}