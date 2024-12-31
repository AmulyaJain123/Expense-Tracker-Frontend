import { processActivity } from "../util/loaderUtility";
import { getTillExpiry } from "../util/algo";
import { isAfter } from "date-fns";

export async function profileLoader({ request }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/profile/myprofile",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const { profile, vault, transactions, friends, splits } = await res.json();
            console.log(profile);
            const obj = processActivity(profile.activity);
            return { ...profile, pActivity: obj, vault, transactions, friends, splits };
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }


}

export async function profileViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/profile/viewprofile",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: params.userId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const { profile, vault, transactions, friends, splits } = await res.json();
            console.log(profile);
            const obj = processActivity(profile.activity);
            return { ...profile, pActivity: obj, vault, transactions, friends, splits };
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }


}

export async function vaultReceiptsViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/vault/getreceipts",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            for (let i of result) {
                i.details.recDate = new Date(new Date(i.details.recDate).toLocaleDateString()).toDateString();
                i.details.createdOn = new Date(new Date(i.details.createdOn).toLocaleDateString()).toDateString();
            }
            result.reverse();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function vaultWarrantyViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/vault/getwarranties",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            for (let i of result) {
                i.details.warDate = new Date(new Date(i.details.warDate).toLocaleDateString()).toDateString();
                i.details.createdOn = new Date(new Date(i.details.createdOn).toLocaleDateString()).toDateString();
                i.details.expiry.date = i.details.expiry.date === null ? null : new Date(new Date(i.details.expiry.date).toLocaleDateString()).toDateString();
                i.details.expiry.till = getTillExpiry(new Date(), new Date(i.details.expiry.date));
                if (i.details.expiry.renewedOn) {
                    i.details.expiry.renewedOn = new Date(new Date(i.details.expiry.renewedOn).toLocaleDateString()).toDateString();
                }
            }
            result.reverse();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function receiptViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/vault/getreceipt",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recId: params.recId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.details.recDate = new Date(new Date(result.details.recDate).toLocaleDateString()).toDateString();
            result.details.createdOn = new Date(new Date(result.details.createdOn).toLocaleDateString()).toDateString();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function warrantyViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/vault/getwarranty",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    warId: params.warId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.details.warDate = new Date(new Date(result.details.warDate).toLocaleDateString()).toDateString();
            result.details.createdOn = new Date(new Date(result.details.createdOn).toLocaleDateString()).toDateString();
            result.details.expiry.date = new Date(new Date(result.details.expiry.date).toLocaleDateString()).toDateString();
            result.details.expiry.till = getTillExpiry(new Date(), new Date(result.details.expiry.date));
            if (result.details.expiry.renewedOn) {
                result.details.expiry.renewedOn = new Date(new Date(result.details.expiry.renewedOn).toLocaleDateString()).toDateString();
            }
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function savedSplitsViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/split/getsavedsplits",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.reverse();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function savedSplitViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/split/getsavedsplit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    splitId: params.splitId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function sharedSplitsViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/split/getsharedsplits",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.reverse();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function sharedSplitViewLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/split/getsharedsplit",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    splitId: params.splitId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            console.log(result);
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function transactionCreateLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/track/getcategories",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function transactionsLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/track/gettransactionsncategories",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.transactions.reverse();
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function transactionLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/track/gettransaction",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: params.trackId
                }),
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            console.log(result);
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}

export async function dashboardLoader({ request, params }) {
    try {
        const res = await fetch(
            import.meta.env.VITE_BACKEND_API + "/track/getDashboardData",
            {
                method: "GET",
                credentials: "include",
            }
        );
        if (!res.ok) {
            throw "500"
        } else {
            const result = await res.json();
            result.transactions.sort((a, b) => {
                const ad = new Date(a.dateTime);
                const bd = new Date(b.dateTime);
                if (isAfter(ad, bd)) {
                    return -1;
                } else {
                    return 1;
                }
            });
            console.log(result);
            return result
        }
    } catch (err) {
        console.log(err);
        throw "swr";
    }
}