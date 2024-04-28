import { useState } from "react";

export default function Counter({ initVal }: { initVal: number }) {
  const [count, setCount] = useState(initVal);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
