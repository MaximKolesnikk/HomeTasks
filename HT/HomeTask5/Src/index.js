import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../styles/styles.css";
import React from "react";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
