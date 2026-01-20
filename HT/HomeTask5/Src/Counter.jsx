import { useState } from 'react';
import React from 'react';
export default function Counter({ title }) {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>{title}</h2>
      <div className="counter-display">{count}</div>
      <button onClick={() => setCount(c => c + 1)}>Вгору</button>
      <button onClick={() => setCount(c => c - 1)}>Вниз</button>
    </div>
  );
}