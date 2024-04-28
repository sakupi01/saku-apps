import { css } from "hono/css";
import { useState } from "hono/jsx";

const buttonClass = css`
  background-color: #fff;
  &:hover {
    background-color: red;
  }
`;

export default function Counter({ initVal }: { initVal: number }) {
  const [count, setCount] = useState(initVal);
  return (
    <div>
      <p>{count}</p>
      <button className={buttonClass} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
