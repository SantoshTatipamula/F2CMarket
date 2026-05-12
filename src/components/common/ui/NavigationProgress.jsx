import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Thin progress bar at the very top of the page that animates on every
 * route navigation — the same pattern used by YouTube, GitHub, and Notion.
 *
 * Mount this once inside AppLayout (or AppRoutes) and it works automatically.
 */
export default function NavigationProgress() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const completeRef = useRef(null);

  useEffect(() => {
    // Clear any in-flight timers from the previous navigation
    clearTimeout(timerRef.current);
    clearTimeout(completeRef.current);

    // Start: snap to 0 then ramp up quickly to ~85 %
    setProgress(0);
    setVisible(true);

    // Small delay so the reset to 0 is painted before we animate forward
    timerRef.current = setTimeout(() => setProgress(85), 20);

    // Complete: shoot to 100 % after a short hold, then fade out
    completeRef.current = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 300);
    }, 400);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(completeRef.current);
    };
  }, [location.key]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[9999] h-[3px] rounded-r-full pointer-events-none"
      style={{
        width: `${progress}%`,
        background: "var(--primary)",
        boxShadow: "0 0 8px var(--primary)",
        transition:
          progress === 0
            ? "none"
            : progress === 100
            ? "width 0.2s ease-out, opacity 0.3s ease"
            : "width 0.4s cubic-bezier(0.1, 0.05, 0, 1)",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
