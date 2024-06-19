import { useEffect } from "react";
import { IndexStore } from "./utils/indexStore";
import { ethers } from "ethers";

const STAMP = "bdf637f9d62784457b8d1e67c89fc5433c84cbee392290485f810444c95fd165";
const BEE_API_URL = "http://localhost:1633";

function StoreTest() {
    useEffect(() => {
        test();
    });

    async function loadStore() {
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

    async function test() {
        const store = await loadStore();
        const res = await store.set({ test: "Hello World" });
        console.log("Set result: ", res);
        const data = await store.get();
        console.log("Data: ", data);
    }

    return (
        <div>
            <h1>Store Test</h1>
        </div>
    );
}

export default StoreTest;