import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/pointer";
import type { View } from "@/hooks/use-route";

const coverMs = 430;
const revealMs = 520;

function scrollToHash() {
  const target = document.getElementById(window.location.hash.slice(1));
  const root = document.documentElement;
  root.style.scrollBehavior = "auto";
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
  root.style.scrollBehavior = "";
}

/** Holds the old view while a colour panel covers the screen, then swaps pages underneath it. */
export function usePageSwap(view: View) {
  const [shown, setShown] = useState(view);
  const [wipe, setWipe] = useState<"" | "in" | "out">("");
  const settled = useRef(false);
  const landed = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => (settled.current = true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === shown) return;
    if (!settled.current || prefersReducedMotion()) {
      setShown(view);
      return;
    }
    setWipe("in");
    const cover = setTimeout(() => {
      setShown(view);
      setWipe("out");
    }, coverMs);
    return () => clearTimeout(cover);
  }, [view, shown]);

  useEffect(() => {
    if (wipe !== "out") return;
    const reveal = setTimeout(() => setWipe(""), revealMs);
    return () => clearTimeout(reveal);
  }, [wipe]);

  useEffect(() => {
    if (!landed.current) {
      landed.current = true;
      return;
    }
    scrollToHash();
  }, [shown]);

  return { shown, wipe };
}
