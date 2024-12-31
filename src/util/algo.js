import { add, differenceInDays, differenceInMonths, differenceInYears } from "date-fns"
import numeral from "numeral";

function getNames(bills) {
    const arrOfNames = [];
    for (let i of bills) {
        if (!arrOfNames.includes(i.payedBy)) {
            arrOfNames.push(i.payedBy);
        }
        for (let j of i.shares) {
            if (!arrOfNames.includes(j.name)) {
                arrOfNames.push(j.name);
            }
        }
    }
    return arrOfNames;
}


export function toadjlist(bills, names) {
    const arr = [];
    for (let i = 0; i < names.length; ++i) {
        const temp = [];
        for (let j = 0; j < names.length; ++j) {
            temp.push(0);
        }
        arr.push(temp);
    }


    for (let i of bills) {
        const payerInd = names.indexOf(i.payedBy);
        for (let j of i.shares) {
            const payeeInd = names.indexOf(j.name);
            if (payerInd === payeeInd) {
                continue;
            }
            arr[payeeInd][payerInd] = j.share;
        }
    }

    for (let i = 0; i < names.length; ++i) {
        for (let j = 0; j < names.length; ++j) {
            const num = Math.min(arr[i][j], arr[j][i]);
            arr[i][j] -= num;
            arr[j][i] -= num;
        }
    }

    const list = [];
    for (let i of names) {
        list.push([]);
    }

    for (let i = 0; i < names.length; ++i) {
        for (let j = 0; j < names.length; ++j) {
            const num = arr[i][j];
            if (num != 0) {
                list[i].push({ ind: j, val: num });
            }
        }
    }
    const edges = [];
    for (let i = 0; i < names.length; ++i) {
        for (let j of list[i]) {
            edges.push({ from: i, to: j.ind, val: j.val });
        }
    }


    return [arr, list, edges];


}

function getOwes(edges, names) {
    const arr = new Array(names.length).fill(0);
    for (let i of edges) {
        const fromInd = i.from;
        const toInd = i.to;
        arr[fromInd] -= i.val;
        arr[toInd] += i.val;
    }
    const givers = [];
    const recievers = [];
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] < 0) {
            givers.push({ name: i, val: arr[i] });
        } else if (arr[i] > 0) {
            recievers.push({ name: i, val: arr[i] });
        }
    }
    givers.sort((a, b) => {
        return a.val - b.val;
    })
    while (givers.length && givers[0].val === 0) {
        givers.shift();
    }

    recievers.sort((a, b) => {
        return b.val - a.val;
    })
    while (recievers.length && recievers[recievers.length - 1].val === 0) {
        givers.pop();
    }

    return [givers, recievers];
}

function getOweList(edges, names) {
    const arr = new Array(names.length).fill(0);
    for (let i of edges) {
        const fromInd = i.from;
        const toInd = i.to;
        arr[fromInd] -= i.val;
        arr[toInd] += i.val;
    }
    console.log(arr);
    const list = [];
    for (let i = 0; i < arr.length; ++i) {
        list.push({
            name: names[i],
            val: arr[i]
        })
    }

    return list;

}

function getMatList(adjMat, adjList, names) {
    const matrix = [];
    const list = [];

    for (let i of names) {
        matrix.push([i]);
        list.push([i]);
    }

    for (let i = 0; i < names.length; ++i) {
        const arr = [];
        for (let j = 0; j < names.length; ++j) {
            arr.push({ name: names[j], val: adjMat[i][j] });
        }
        matrix[i].push(arr);
    }

    for (let i = 0; i < names.length; ++i) {
        const arr = [];
        for (let j of adjList[i]) {
            arr.push({ name: names[j.ind], val: j.val })
        }
        list[i].push(arr);
    }

    return [matrix, list];
}

function getExpenditure(bills, names) {
    const arr = new Array(names.length).fill(0);
    const spent = new Array(names.length).fill(0);
    for (let i of bills) {
        const toInd = names.indexOf(i.payedBy);
        spent[toInd] += parseFloat(i.totalAmt);
        for (let j of i.shares) {
            const fromInd = names.indexOf(j.name);
            arr[fromInd] += j.share;
        }
    }

    const spendings = [];
    const expenditure = [];
    for (let i = 0; i < names.length; ++i) {
        spendings.push({ name: names[i], val: spent[i] });
        expenditure.push({ name: names[i], val: arr[i] });

    }

    return [expenditure, spendings];

}

function getAllTransactions(edges, names) {
    const arr = [];
    for (let i of edges) {
        arr.push({ from: names[i.from], to: names[i.to], val: i.val });
    }
    return arr;
}

export function splitAlgo(bills) {
    const names = getNames(bills);
    const [adjMat, adjList, edges] = toadjlist(bills, names);
    console.log(adjMat, adjList, edges);
    const [expenditure, spendings] = getExpenditure(bills, names);
    const [finalMatrix, finalList] = getMatList(adjMat, adjList, names);
    const oweList = getOweList(edges, names);
    const [givers, recievers] = getOwes(edges, names);

    const transactions = [];

    while (givers.length && recievers.length) {
        if (Math.abs(givers[0].val) < Math.abs(recievers[0].val)) {
            transactions.push({ from: names[givers[0].name], to: names[recievers[0].name], val: Math.abs(givers[0].val) })
            recievers[0].val -= Math.abs(givers[0].val)
            recievers.sort((a, b) => {
                return b.val - a.val;
            })
            givers.shift();
        }
        else if (Math.abs(givers[0].val) > Math.abs(recievers[0].val)) {
            transactions.push({ from: names[givers[0].name], to: names[recievers[0].name], val: Math.abs(recievers[0].val) })
            givers[0].val += Math.abs(recievers[0].val)
            givers.sort((a, b) => {
                return a.val - b.val;
            })
            recievers.shift();
        }
        else if (Math.abs(givers[0].val) === Math.abs(recievers[0].val)) {
            transactions.push({ from: names[givers[0].name], to: names[recievers[0].name], val: Math.abs(recievers[0].val) })
            givers.shift();
            recievers.shift();
        }
    }

    const allTransactions = getAllTransactions(edges, names);
    oweList.forEach((i) => i.val = 0 - i.val);

    console.log(allTransactions, finalList, oweList, transactions, expenditure, spendings);

    return [allTransactions, finalList, oweList, transactions, spendings, expenditure];


}

export function formatVal(value) {
    const str = numeral(value).format('0.00');
    const ans = `${str} ₹`;
    return ans;
}

export function amountInRange(val) {
    if (val[0] === '-') {
        return false;
    }
    if (val.length > 15) {
        return false;
    }
    return true;

}

export function billAmountValidate(val) {
    if (val === "") {
        return true;
    }
    const num = parseFloat(val);
    if (num <= 0) {
        return false;
    } else {
        return true;
    }
}

export function billDurationValidate(val) {
    if (val === "") {
        return true;
    }
    const num = parseFloat(val);
    if (num % 1.0 != 0) {
        return false;
    }
    if (num <= 0) {
        return false;
    } else {
        return true;
    }
}

export function validateFileUpload(file) {
    if (file.size > 2000000) {
        return "File size is too big. File should be less than 2MB.";
    }
    if (!["image/jpg", "image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        return "File type not supported. File must only be of jpg, jpeg, png or pdf type.";
    }
    return null;
}

export function formatDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function isLeapYear(year) {
    const start = parseInt(year);
    if ((start % 4 === 0 && start % 100 !== 0) || (start % 400 === 0)) {
        return true;
    }
    return false;
}

export const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function getNoOfDays(month, year) {
    if (month == 1 && isLeapYear(year)) {
        return 29;
    } else {
        return daysInMonth[month];
    }
}

export function calcExpiry(duration, start) {
    const res = add(start, duration)
    console.log(res);
    return res;
}

export function getTillExpiry(today, expiry) {
    console.log(today, expiry, new Date(today).getTime(), new Date(expiry).getTime())
    if (new Date(today).getTime() >= new Date(expiry).getTime()) {
        return null;
    }
    let temp = new Date(today);
    const years = differenceInYears(expiry, temp);
    temp = add(temp, { years: years });
    const months = differenceInMonths(expiry, temp);
    temp = add(temp, { months: months });
    const days = differenceInDays(expiry, temp);
    return { months, years, days };

}