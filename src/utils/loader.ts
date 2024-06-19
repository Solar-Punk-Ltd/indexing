import { ethers } from "ethers";
import { Store } from "./tagStore";

const STAMP = "bdf637f9d62784457b8d1e67c89fc5433c84cbee392290485f810444c95fd165";
const BEE_API_URL = "http://localhost:1633";

export async function loadStore() {
    const localStorageReadResult = localStorage.getItem("privateKey");
    let privKey = null;
    if (!localStorageReadResult) {
        privKey = ethers.Wallet.createRandom().privateKey;
        localStorage.setItem("privateKey", privKey);
    } else {
        privKey = localStorageReadResult;
    }
    const store = new Store(privKey, STAMP, BEE_API_URL);
    store.initialize();

    return store;
}