
export function checkDate(date){
    let newDate = new Date();
    console.log(date.substring(0, 4) <= newDate.getFullYear().toString() &&
        date.substring(5, 7) <= (newDate.getMonth() + 1).toString() &&
        date.substring(8, 10) <= newDate.getDate().toString());
    return date.substring(0,4) <= newDate.getFullYear().toString() &&
    date.substring(5,7) <= (newDate.getMonth()+1).toString() &&
    date.substring(8,10) <= newDate.getDate().toString();
}