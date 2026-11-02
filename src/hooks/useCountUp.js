import { useEffect, useRef, useState } from "react";

// Makes a number "count up" from 0 to `target` the first time it scrolls
// into view -- the little animation you see on stat cards.
//
// Usage:   const [ref, value] = useCountUp(120);
//          <span ref={ref}>{value}</span>
export const useCountUp = (target, duration = 1100) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  // 1) wait until the element is visible on screen
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // 2) once visible (and whenever the target changes), animate to it
  useEffect(() => {
    if (!started) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const startTime = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // starts fast, slows down
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return [ref, value];
};
