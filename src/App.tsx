import { useEffect, useState } from "react";
import "./App.css";
import { Store } from "./utils/tagStore";

function App() {
  const [count, setCount] = useState(0);


  const STAMP = 'bdf637f9d62784457b8d1e67c89fc5433c84cbee392290485f810444c95fd165';
  const BEE_API_URL = 'http://localhost:1633';
  const store = new Store('12341234'.repeat(8), STAMP, BEE_API_URL);
  useEffect(() => {
    test();
  });
  async function test() {
    console.log(await store.initialize())
    console.log(await store.append('a', 'b'))
    console.log(await store.append('a', 'c'))
    console.log(await store.getAll())
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
