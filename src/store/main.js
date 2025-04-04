import { configureStore } from "@reduxjs/toolkit";
import { splitCreateSlice } from "./splitCreateSlice";
import { vaultSlice } from "./vaultSlice.js";
import { universalSlice } from "./universalSlice.js";
import { transactionSlice } from "./transactionSlice.js";
import { distributionSlice } from "./distributionSlice.js";
import { dashboardSlice } from "./dashboardSlice.js";
import { realtimeSlice } from "./realtimeSlice.js";
import { messagesSlice } from "./messagesSlice.js";



const store = configureStore({
    reducer: {
        splitCreate: splitCreateSlice.reducer,
        vault: vaultSlice.reducer,
        universal: universalSlice.reducer,
        transactions: transactionSlice.reducer,
        distribution: distributionSlice.reducer,
        dashboard: dashboardSlice.reducer,
        realtime: realtimeSlice.reducer,
        messages: messagesSlice.reducer,

    }
})

export const splitCreateActions = splitCreateSlice.actions;
export const vaultActions = vaultSlice.actions;
export const universalActions = universalSlice.actions;
export const transactionActions = transactionSlice.actions;
export const distributionActions = distributionSlice.actions;
export const dashboardActions = dashboardSlice.actions;
export const realtimeActions = realtimeSlice.actions;
export const messagesActions = messagesSlice.actions;



export default store;