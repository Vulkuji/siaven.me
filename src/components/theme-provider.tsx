import { useEffect, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ThemeMetadata() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (!resolvedTheme) return;
    const frame = requestAnimationFrame(() => {
      const background = getComputedStyle(document.documentElement)
        .getPropertyValue("--paper")
        .trim();
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", background);
    });
    return () => cancelAnimationFrame(frame);
  }, [resolvedTheme]);
  return null;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      storageKey="siaven-theme"
      disableTransitionOnChange
    >
      <ThemeMetadata />
      {children}
    </NextThemesProvider>
  );
}
