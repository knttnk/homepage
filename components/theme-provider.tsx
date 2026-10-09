"use client";

// ThemeProvider は app/layout.tsx で @wrksz/themes/next から読み込む。
// intentui のコンポーネント（toast.tsx など）がここから useTheme を import するため、再エクスポートだけ残す。
export { useTheme } from "@wrksz/themes/client";
