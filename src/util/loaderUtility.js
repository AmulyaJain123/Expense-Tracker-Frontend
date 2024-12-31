import { isLeapYear } from "./algo";

export function processActivity(activity) {
    const arr = activity.map((i) => {
        const date = new Date(parseInt(i));
        return date.toDateString();
    })
    console.log(arr);
    const firstyear = new Date(parseInt(activity[0])).getFullYear();
    const lastyear = new Date(parseInt(activity[activity.length - 1])).getFullYear();
    let ind = 0;
    let start = firstyear;
    let ans = [];
    let maxStreak = 0;
    let tempStreak = 0;
    let totalActiveDays = 0;
    let yearlyActiveDays = 0;
    while (start <= lastyear) {
        let temp = new Date().setFullYear(start, 0, 1);
        let date = new Date(temp);
        let days = 365;
        if (isLeapYear(start)) {
            days = 366;
        }
        let dayList = [];
        for (let i = 0; i < days; ++i) {
            let newTemp = temp + (1000 * 24 * 60 * 60 * i);
            let newDate = new Date(newTemp);
            let dtstr = newDate.toDateString().split(' ');
            let boolVal = false;
            if (ind < arr.length && arr[ind] === newDate.toDateString()) {
                boolVal = true;
                ++ind;
                ++tempStreak;
                ++totalActiveDays;
                ++yearlyActiveDays;
            } else {
                maxStreak = Math.max(maxStreak, tempStreak);
                tempStreak = 0;
            }
            const config = {
                dow: dtstr[0],
                dowNum: (newDate.getDay() - 1 + 7) % 7,
                monthName: dtstr[1],
                date: dtstr[2],
                year: dtstr[3],
                monthNo: newDate.getMonth() + 1,
                active: boolVal
            }
            dayList.push(config);
        }
        console.log(dayList);
        let newList = []
        let tempList = [];
        let currMonth = 1;
        for (let i = 0; i < dayList.length; ++i) {
            if (dayList[i].monthNo === currMonth) {
                tempList.push(dayList[i]);
            } else {
                ++currMonth;
                newList.push(tempList);
                tempList = [];
                tempList.push(dayList[i]);
            }
        }
        newList.push(tempList);
        for (let i = 0; i < newList.length; ++i) {
            let num = newList[i][0].dowNum;
            while (num > 0) {
                newList[i].unshift(null);
                --num;
            }
        }
        let config = {
            year: start,
            days: days,
            calendar: newList,
            totalActiveDays: yearlyActiveDays
        }
        ans.push(config);
        ++start;
        yearlyActiveDays = 0;
    }
    maxStreak = Math.max(maxStreak, tempStreak);
    const finalAns = {
        list: ans,
        maxStreak: maxStreak,
        totalActiveDays: totalActiveDays,

    }
    console.log(finalAns);
    return finalAns;
}