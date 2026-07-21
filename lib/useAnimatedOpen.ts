"use client";

import { useEffect, useState } from "react";

/**
 * Keeps a dropdown panel mounted long enough to play its exit animation.
 *
 * `open` is the logical state; render the panel while `mounted` is true and
 * switch its class from `panel-in` to `panel-out` while `closing` is true.
 * Unmount happens on a timer (not animationend) so panels still close under
 * prefers-reduced-motion, where the animation never runs.
 */
export function useAnimatedOpen(
  open: boolean,
  closeMs = 170
): { mounted: boolean; closing: boolean } {
  const [mounted, setMounted] = useState(open);
  const [prevOpen, setPrevOpen] = useState(open);

  // Adjust-during-render (the React-endorsed alternative to a sync effect):
  // the moment `open` flips true, remount immediately so the enter animation
  // starts on this very render — and a pending close is cancelled by dep change.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && !mounted) setMounted(true);
  }

  const closing = mounted && !open;

  useEffect(() => {
    if (!closing) return;
    const t = window.setTimeout(() => setMounted(false), closeMs);
    return () => window.clearTimeout(t);
  }, [closing, closeMs]);

  return { mounted, closing };
}
