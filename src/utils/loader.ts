import { ethers } from "ethers";
import { IndexStore } from "./indexStore";
import { STAMP, BEE_API_URL } from "../config"

export async function loadStore() {
    const localStorageReadResult = localStorage.getItem("privateKey");
    let privKey = null;
    if (!localStorageReadResult) {
        privKey = ethers.Wallet.createRandom().privateKey;
        localStorage.setItem("privateKey", privKey);
    } else {
        privKey = localStorageReadResult;
    }
    const store = new IndexStore(privKey, STAMP, BEE_API_URL);
    store.initialize();

    return store;
}