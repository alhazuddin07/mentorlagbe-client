
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
    children: ReactNode;
    attribute?: "class" | `data-${string}`;
    defaultTheme?: string;
    enableSystem?: boolean;
    storageKey?: string;
};

/**
 * Delegates to next-themes so `useTheme()` (see ThemeToggle) has real context.
 * next-themes injects a pre-hydration script that applies the stored/system
 * theme before first paint, and syncs the `class` on <html>.
 */
export default function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
