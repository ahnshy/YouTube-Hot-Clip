
"use client";

import * as React from "react";
import { createTheme, ThemeProvider, CssBaseline, PaletteMode, StyledEngineProvider } from "@mui/material";
import { deepmerge } from "@mui/utils";

type Mode = "light" | "dark" | "night";

export const ColorModeContext = React.createContext<{mode: Mode; setMode:(m:Mode)=>void}>({
  mode: "light",
  setMode: () => {}
});

function getDesignTokens(mode: Mode) {
  const base: any = {
    typography: { fontFamily: `"Inter", "Noto Sans KR", system-ui, Arial, sans-serif` },
    shape: { borderRadius: 14 }
  };

  const light = {
    palette: {
      mode: "light" as PaletteMode,
      background: { default: "#fafafa", paper: "#fff" },
      text: { primary: "#111" }
    }
  };

  const dark = {
    palette: {
      mode: "dark" as PaletteMode,
      background: { default: "#0f1115", paper: "#151823" },
      text: { primary: "#e8e8f0" }
    }
  };

  const night = {
    palette: {
      mode: "dark" as PaletteMode,
      background: { default: "#0b0f14", paper: "#0f141c" },
      text: { primary: "#cfe3ff" },
      primary: { main: "#7aa2f7" },
      secondary: { main: "#9ece6a" }
    }
  };

  const tokens = mode === "light" ? light : mode === "dark" ? dark : night;
  return deepmerge(base, tokens);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<Mode>(() => (typeof window !== "undefined" ? (localStorage.getItem("mode") as Mode) || "dark" : "dark"));

  React.useEffect(() => {
    localStorage.setItem("mode", mode);
    document.documentElement.setAttribute("data-mode", mode);
  }, [mode]);

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}
