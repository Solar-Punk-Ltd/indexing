import { useEffect, useState } from "react";
import "./App.css";
import { Store } from "./utils/tagStore";
import { IndexStore } from "./utils/indexStore";

function App() {
  const [count, setCount] = useState(0);


  const STAMP = 'bdf637f9d62784457b8d1e67c89fc5433c84cbee392290485f810444c95fd165';
  const BEE_API_URL = 'http://localhost:1633';
  const indexStore = new IndexStore('12341234'.repeat(8), STAMP, BEE_API_URL);
  useEffect(() => { 
    test();
  });
  async function test() {
    const obj = { 'kutya': ['ref1', 'ref2', 'ref3'] };
    console.log(await indexStore.initialize())
    console.log(await indexStore.set(obj))
    console.log(await indexStore.get())
  }


  return (
    <>
      <div>
        <div>
          <div>Select content</div>
        </div>
        <div>
          <div>Select content</div>
        </div>
      </div>
    </>
  );
}

export default App;
