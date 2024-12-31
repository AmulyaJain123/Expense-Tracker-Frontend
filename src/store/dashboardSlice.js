import { createSlice } from "@reduxjs/toolkit";

const intialDashboardState = {
    data: null
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: intialDashboardState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        }
    }
});