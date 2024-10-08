import dayjs from "dayjs";

const getMonth = (month = dayjs().month()) => {
    month = Math.floor(month);
    const year = dayjs().year();
    // const firstDayofMonth = dayjs().year(year).month(month).startOf("month");
    const firstDayofTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayofTheMonth;
    const dayMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(()=> {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount))
        });
    })
    return dayMatrix;
}

export {getMonth};
