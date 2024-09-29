const BACK_URL = import.meta.env.VITE_API_BASE_URL;
import { io } from "socket.io-client";

const toastOptions = {
  style: {
    background: '#1f1f1f',
    color: '#fff',
  },
}

const socket = io(`${BACK_URL}`);

export { BACK_URL, toastOptions, socket };