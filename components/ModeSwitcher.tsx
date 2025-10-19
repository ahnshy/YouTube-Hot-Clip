
"use client";
import * as React from "react";
import { ColorModeContext } from "./ThemeRegistry";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import NightlightIcon from "@mui/icons-material/NightlightRound";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ModeSwitcher(){
  const { mode, setMode } = React.useContext(ColorModeContext);
  const handle = (_:any, nv:any) => nv && setMode(nv);
  return (
    <ToggleButtonGroup value={mode} exclusive onChange={handle} size="small">
      <ToggleButton value="light" aria-label="light mode"><Brightness5Icon fontSize="small"/></ToggleButton>
      <ToggleButton value="dark" aria-label="dark mode"><DarkModeIcon fontSize="small"/></ToggleButton>
      <ToggleButton value="night" aria-label="night mode"><NightlightIcon fontSize="small"/></ToggleButton>
    </ToggleButtonGroup>
  );
}
