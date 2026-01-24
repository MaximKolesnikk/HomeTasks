import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProviderWrapper } from "../provider/ThemeContext.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderWrapper>
    <App />
  </ThemeProviderWrapper>,
);
