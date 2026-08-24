import { useCallback, useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let currentTheme: Theme = getInitialTheme();
const listeners = new Set<() => void>();

function setGlobalTheme(theme: Theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentTheme;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const toggle = useCallback(() => {
    setGlobalTheme(currentTheme === "light" ? "dark" : "light");
  }, []);

  return { theme, toggle };
}
