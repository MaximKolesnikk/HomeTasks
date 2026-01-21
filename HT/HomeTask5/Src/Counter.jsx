import { useState } from "react";
import React from "react";
import { CounterContext } from "../provider/CounterProvider.jsx";

const Counter = () => {
  const { count, increment, decrement } = React.useContext(CounterContext);

  return (
    <div>
      <h2>Counter </h2>
      <p>Current count :{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
export default Counter;
