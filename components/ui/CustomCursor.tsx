"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Hide cursor on touch devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

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

    // Detect hovers on interactive nodes
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[data-hover="pointer"]')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mouseover", onMouseOver);

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
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${hovering ? "custom-cursor-hovering" : ""}`} 
      />
    </>
  );
}
