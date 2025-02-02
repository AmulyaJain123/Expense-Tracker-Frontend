import { createSlice } from "@reduxjs/toolkit";

const intialRealtimeState = {
    notifications: []
};

export const realtimeSlice = createSlice({
    name: "universal",
    initialState: intialRealtimeState,
    reducers: {
        pushNotification(state, action) {
            state.notifications.push(action.payload);
        },
        removeNotifications(state, action) {
            state.notifications = [];
        },
        setNotifications(state, action) {
            state.notifications = action.payload;
        }
    },
});
