import { io } from "socket.io-client";
import SimpleCrypto from "simple-crypto-js";

const BACK_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_SIMPLE_CRYPTO_JS_SECRET = import.meta.env.VITE_SIMPLE_CRYPTO_JS_SECRET;

const toastOptions = {
  style: {
    background: '#1f1f1f',
    color: '#fff',
  },
}

const simpleCrypto = new SimpleCrypto(VITE_SIMPLE_CRYPTO_JS_SECRET);

const socket = io(`${BACK_URL}`);

export { BACK_URL, toastOptions, socket, simpleCrypto };