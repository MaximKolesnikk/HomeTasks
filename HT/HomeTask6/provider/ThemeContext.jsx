import React, { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    return saved ? saved : "light";
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
            paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
        components: {
          MuiDataGrid: {
            styleOverrides: {
              root: {
                border: "none",
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
                color: mode === "dark" ? "#e0e0e0" : "#000000",
              },
              columnHeaders: {
                backgroundColor: mode === "dark" ? "#252525" : "#f0f0f0",
                color: mode === "dark" ? "#ffffff" : "#000000",
              },
              row: {
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#333333" : "#f5f5f5",
                },
                "&.Mui-selected": {
                  backgroundColor: mode === "dark" ? "#2a4a6e" : "#e3f2fd",
                  "&:hover": {
                    backgroundColor: mode === "dark" ? "#3a5a7e" : "#d1e9ff",
                  },
                },
              },
              cell: {
                borderBottomColor: mode === "dark" ? "#333" : "#e0e0e0",
              },
            },
          },

          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
                color: mode === "dark" ? "#e0e0e0" : "#000000",
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
