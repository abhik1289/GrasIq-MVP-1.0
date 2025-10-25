"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AdminThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  if (!mounted) return null;
  // Avoid SSR mismatch
  console.log(theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && theme) {
      setTheme("dark");
      //   setIsDark(theme === "dark");
    }
  }, []);
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
