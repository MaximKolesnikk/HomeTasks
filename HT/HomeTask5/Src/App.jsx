import React from "react";
import Counter from './Counter.jsx';
import '../styles/styles.css';

export default function App() {
  return (
    <div className="wrapper">
      <h1> Лічильники</h1>
      
      <div className="counters">
        <Counter title="Лічильник 1" />
        <Counter title="Лічильник 2" />
      </div>
    </div>
  );
}