import { createSlice } from "@reduxjs/toolkit";

const intialTransactionState = {
    filterParam: null,
    durations: [],
    filteredData: null,
    SortedData: null,
    filtersAdded: [],
    open: false,

};

export const transactionSlice = createSlice({
    name: "transactions",
    initialState: intialTransactionState,
    reducers: {
        setFilterParam(state, action) {
            state.filterParam = action.payload;
        },
        pushDuration(state, action) {
            state.durations.push(action.payload);
        },
        popDuration(state, action) {
            state.durations.splice(action.payload, 1);
        },
        clearDurations(state) {
            state.durations = [];
        },
        setFilteredData(state, action) {
            state.filteredData = [...(action.payload)];
        },
        clearFilteredData(state) {
            state.filteredData = null;
        },
        setSortedData(state, action) {
            state.SortedData = [...(action.payload)]
        },
        pushFilter(state, action) {
            state.filtersAdded.push(action.payload);
        },
        popFilter(state, action) {
            state.filtersAdded.splice(action.payload, 1);
        },
        clearFilter(state) {
            state.filtersAdded = [];
        },
        reverseOpen(state) {
            state.open = !state.open;
        },
        closeOpen(state) {
            state.open = false;
        }
    },
});
