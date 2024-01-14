
const date = (createdDate) => {
    const date = new Date(createdDate);

    const monthArr = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.' ];
    const weekDayArr = ['Sunday' ,'Monday', 'Tuesday', 'Wednesday.', 'Thursday', 'Friday.', 'Saturday'];

    const month = monthArr[date.getMonth()];
    const weekDay = weekDayArr[date.getDay()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    const fullDate = `${weekDay} ${day} ${month} ${year} ${time}`

    return {
        month,
        weekDay,
        day,
        year,
        time,
        fullDate
    }
    
}

export default date

