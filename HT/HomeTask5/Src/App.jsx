import React from "react";
import Counter from "./Counter.jsx";
import "../styles/styles.css";
import { useContext } from "react";

import { CounterProvider } from "../provider/CounterProvider.jsx";

export default function App() {
  return (
    <div className="MainContainer">
      <h1>Лічильники</h1>
      <div className="counters">
        <div>
          <CounterProvider>
            <Counter />
          </CounterProvider>
        </div>
        <div>
          <CounterProvider>
            <Counter />
          </CounterProvider>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
}
