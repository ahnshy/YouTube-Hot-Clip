
"use client";
import * as React from "react";
import { Tabs, Tab } from "@mui/material";

const labels = [
  { key: "all", label: "종합" },
  { key: "politics", label: "정치" },
  { key: "economy", label: "경제" },
  { key: "society", label: "사회" },
  { key: "entertainment", label: "연예" },
  { key: "variety", label: "예능" },
  { key: "ict", label: "정보통신·SW" },
  { key: "coding", label: "코딩" }
] as const;

export type CategoryKey = typeof labels[number]["key"];

export default function CategoryTabs({ value, onChange }:{value: CategoryKey; onChange:(v:CategoryKey)=>void}) {
  const handle = (_:any, nv:string) => nv && onChange(nv as CategoryKey);
  return (
    <Tabs value={value} onChange={handle} variant="scrollable" scrollButtons="auto">
      {labels.map(c => <Tab key={c.key} value={c.key} label={c.label} />)}
    </Tabs>
  );
}
