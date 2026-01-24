import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../../provider/ThemeContext.jsx";

export default function Navigation() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="sidebar">
      <h2>Меню</h2>
      <ul>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/heroes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Heroes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
      </ul>

      <div style={{ marginTop: "auto", padding: "16px 0" }}>
        <FormControlLabel
          control={
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              icon={<LightModeIcon />}
              checkedIcon={<DarkModeIcon />}
              color="default"
            />
          }
          label={mode === "dark" ? "Темна тема" : "Світла тема"}
          labelPlacement="start"
          sx={{ color: "inherit" }}
        />
      </div>
    </nav>
  );
}
