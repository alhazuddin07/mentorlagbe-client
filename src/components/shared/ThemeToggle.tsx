
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="Toggle theme"
                className="flex size-10 items-center justify-center rounded-full border"
            >
                <Sun size={19} />
            </button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            title={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all hover:bg-gray-100 dark:border-[#302D40] dark:bg-[#1C1A29] dark:text-[#B5A5FF] dark:hover:bg-[#302D40]"
        >
            {isDark ? (
                <Sun size={19} />
            ) : (
                <Moon size={19} />
            )}
        </button>
    );
}