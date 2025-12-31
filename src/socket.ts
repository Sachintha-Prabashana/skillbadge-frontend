import { io, Socket } from "socket.io-client";

// Define the URL (ensure this variable exists in your .env)
const URL = import.meta.env.VITE_API_URL;

// Export the socket instance
// "autoConnect: false" is important so it doesn't connect before you are ready
export const socket: Socket = io(URL, {
  autoConnect: false
});