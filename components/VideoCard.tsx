
"use client";
import * as React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Stack } from "@mui/material";

export type VideoItem = {
  id: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  viewCount?: string;
  region: string;
};

export default function VideoCard({ video }: { video: VideoItem }) {
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  const date = new Date(video.publishedAt);
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea href={url} target="_blank" rel="noopener noreferrer">
        <CardMedia component="img" height="160" image={video.thumbnail} alt={video.title} />
        <CardContent>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Chip size="small" label={video.region} />
            {video.viewCount && <Chip size="small" label={`${Number(video.viewCount).toLocaleString()} views`} />}
          </Stack>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.channelTitle} · {date.toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
