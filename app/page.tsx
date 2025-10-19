
"use client";

import * as React from "react";
import useSWR from "swr";
import { Container, Box, TextField, InputAdornment, IconButton, Typography, Stack, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RefreshIcon from "@mui/icons-material/Refresh";
import CategoryTabs, { CategoryKey } from "@/components/CategoryTabs";
import RegionPicker, { RegionKey } from "@/components/RegionPicker";
import ModeSwitcher from "@/components/ModeSwitcher";
import VideoCard, { VideoItem } from "@/components/VideoCard";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Page(){
  const [category, setCategory] = React.useState<CategoryKey>("all");
  const [region, setRegion] = React.useState<RegionKey>("KR");
  const [q, setQ] = React.useState("");

  const { data, isLoading, mutate } = useSWR<{items: VideoItem[]}>(`/api/trending?region=${region}&category=${category}&q=${encodeURIComponent(q)}`, fetcher);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box className="toolbar">
        <Stack direction="row" spacing={1} alignItems="center">
          <YouTubeIcon />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>YouTube Hot Clip</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <RegionPicker value={region} onChange={setRegion} />
          <ModeSwitcher />
        </Stack>
      </Box>

      <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
        <CategoryTabs value={category} onChange={setCategory} />
        <TextField
          size="small"
          placeholder="키워드 필터 (예: 금리, 총선, 파업, AI, Python ...)"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          InputProps={{ endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={()=>mutate()} aria-label="search"><SearchIcon/></IconButton>
            </InputAdornment>
          )}}
          sx={{ ml: "auto", minWidth: 280 }}
        />
        <IconButton onClick={()=>mutate()} aria-label="refresh"><RefreshIcon/></IconButton>
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "wait", my: 2 }}>
          <CircularProgress size={16} />
          <Typography>불러오는 중...</Typography>
        </Box>
      )}
      {!isLoading && data && (
        <div className="grid">
          {data.items.map(v => <VideoCard key={v.id+v.region} video={v} />)}
        </div>
      )}
    </Container>
  );
}
