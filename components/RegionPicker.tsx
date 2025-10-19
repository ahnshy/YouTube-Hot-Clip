
"use client";
import * as React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

export type RegionKey = "KR" | "US" | "EU";

export default function RegionPicker({ value, onChange }:{value:RegionKey; onChange:(v:RegionKey)=>void}){
  const handle = (_:any, nv:RegionKey) => nv && onChange(nv);
  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handle}
      size="small"
    >
      <ToggleButton value="KR">한국</ToggleButton>
      <ToggleButton value="US">미국</ToggleButton>
      <ToggleButton value="EU">유럽</ToggleButton>
    </ToggleButtonGroup>
  );
}
