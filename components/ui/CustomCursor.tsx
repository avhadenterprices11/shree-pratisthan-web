"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Hide cursor on touch devices and mobile screens
    const isTouch =
      window.matchMedia("(max-width: 1023px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Track frame loop for smooth interpolation (inertia trail)
    let frameId = 0;
    const updatePosition = () => {
      // Linear interpolation to make the ring lag behind the dot elegantly
      const lerpFactor = 0.15;
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * lerpFactor;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0) translate(-50%, -50%)`;
      }

      frameId = requestAnimationFrame(updatePosition);
    };

    frameId = requestAnimationFrame(updatePosition);

    // Detect hovers on interactive nodes directly on the DOM ref (zero React re-renders)
    const onMouseOver = (e: MouseEvent) => {
      if (!ringRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[data-hover="pointer"]');

      if (isInteractive) {
        ringRef.current.classList.add("custom-cursor-hovering");
      } else {
        ringRef.current.classList.remove("custom-cursor-hovering");
      }
    };

    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
