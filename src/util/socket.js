import { io } from "socket.io-client";

const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;

let socket;

export const createConnection = () => {
    if (!socket) {
        console.log('Connection Forming');
        socket = io(VITE_BACKEND_API, {
            withCredentials: true,
        });
    }
    return socket;
}