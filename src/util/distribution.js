import { outgoingTransactionCategories, incomingTransactionCategories } from "./componentNavigation";


const categoryMapping = {
    "Housing": "Essentials",
    "Transportation": "Essentials",
    "Utility & Bills": "Essentials",
    "Health & Fitness": "Essentials",
    "Education": "Essentials",

    "Food & Dining": "Lifestyle & Leisure",
    "Personal Care": "Lifestyle & Leisure",
    "Entertainment": "Lifestyle & Leisure",

    "Insurance": "Financial Planning",
    "Debt Payment": "Financial Planning",
    "Savings & Investment": "Financial Planning",

    "Gifts & Donations": "Miscellaneous",
    "Misc-Out": "Miscellaneous",

    "Salary & Wage": "Major Earnings",
    "Business Income": "Major Earnings",
    "Government Payments": "Major Earnings",

    "Refund & Reimbursements": "Other Income",
    "Investment Returns": "Other Income",
    "Savings Withdrawals": "Other Income",
    "Debt Taken": "Other Income",

    "Gifts": "Miscellaneous",
    "Misc-In": "Miscellaneous",
}

export function getData(transactions) {

    const ans = [{
        name: "Outgoing", value: 0, subFields: outgoingTransactionCategories.map((i) => {
            return {
                name: i.name,
                value: 0,
                subFields: i.subCategories.map((j) => {
                    return {
                        name: j.name,
                        value: 0,
                    }
                })
            }
        })
    },
    {
        name: "Incoming", value: 0, subFields: incomingTransactionCategories.map((i) => {
            return {
                name: i.name,
                value: 0,
                subFields: i.subCategories.map((j) => {
                    return {
                        name: j.name,
                        value: 0,
                    }
                })
            }
        })
    }];
    // console.log(ans);
    for (let i of transactions) {
        const category = i.category;
        const type = i.transactionType;
        const amount = i.transactionAmount;
        if (type === "Outgoing") {
            // if (ans[0].value === undefined) {
            //     ans[0].value = 0;
            // }
            ans[0].value += amount;
            const parentField = categoryMapping[category];
            const firstInd = ans[0].subFields.findIndex((i) => i.name === parentField);
            // if (ans[0].subFields[firstInd].value === undefined) {
            //     ans[0].subFields[firstInd].value = 0;
            // }
            ans[0].subFields[firstInd].value += amount;
            const secondInd = ans[0].subFields[firstInd].subFields.findIndex((i) => i.name === category);
            // if (ans[0].subFields[firstInd].subFields[secondInd].value === undefined) {
            //     ans[0].subFields[firstInd].subFields[secondInd].value = 0;
            // }
            ans[0].subFields[firstInd].subFields[secondInd].value += amount;
        } else {
            // if (ans[1].value === undefined) {
            //     ans[1].value = 0;
            // }
            ans[1].value += amount;
            const parentField = categoryMapping[category];
            const firstInd = ans[1].subFields.findIndex((i) => i.name === parentField);
            // if (ans[1].subFields[firstInd].value === undefined) {
            //     ans[1].subFields[firstInd].value = 0;
            // }
            // console.log(parentField, category);
            ans[1].subFields[firstInd].value += amount;
            const secondInd = ans[1].subFields[firstInd].subFields.findIndex((i) => i.name === category);
            // if (ans[1].subFields[firstInd].subFields[secondInd].value === undefined) {
            //     ans[1].subFields[firstInd].subFields[secondInd].value = 0;
            // }
            ans[1].subFields[firstInd].subFields[secondInd].value += amount;
        }
    }
    // console.log(JSON.parse(JSON.stringify(ans)));
    function eleminateNulls(currColl) {
        for (let i = 0; i < currColl.length; ++i) {
            // console.log("currcoll", JSON.parse(JSON.stringify(currColl[i])))
            if (currColl[i].value === 0) {
                currColl.splice(i, 1);
                // console.log("spliced", JSON.parse(JSON.stringify(currColl)))
                --i;
            } else {
                let newColl = currColl[i].subFields;
                if (newColl === undefined) {
                    // console.log("undefined");
                    continue;
                } else {
                    // console.log("newcoll", JSON.parse(JSON.stringify(newColl)));
                    eleminateNulls(newColl);
                }
            }
        }
    }
    // for (let i = 0; i < ans.length; ++i) {
    //     for (let j = 0; j < ans[i].subFields.length; ++j) {
    //         eleminateNulls(ans[i].subFields[j].subFields);
    //     }
    // }
    eleminateNulls(ans);
    // console.log(ans);

    return ans;
}