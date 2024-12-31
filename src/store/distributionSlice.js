import { createSlice } from "@reduxjs/toolkit";

const intialDistributionState = {
    durations: [],
    filteredData: null,
};

export const distributionSlice = createSlice({
    name: 'distribution',
    initialState: intialDistributionState,
    reducers: {
        pushDuration(state, action) {
            state.durations.push(action.payload);
        },
        popDuration(state, action) {
            state.durations.splice(action.payload, 1);
        },
        clearDurations(state, action) {
            state.durations = [];
        },
        resetDuration(state, action) {
            state.durations = [action.payload];
        },
        setFilteredData(state, action) {
            state.filteredData = [...(action.payload)];
        },
        clearFilteredData(state) {
            state.filteredData = null;
        },
    }
});