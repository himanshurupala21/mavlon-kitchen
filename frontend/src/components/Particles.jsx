import React, { useEffect, useRef } from "react";

// Lightweight floating gold particles for hero
export default function Particles({ count = 18 }) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.innerHTML = "";
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.opacity = `${Math.random() * 0.5 + 0.2}`;
      const dur = 8 + Math.random() * 8;
      p.style.animation = `float-y ${dur}s ease-in-out ${Math.random() * 4}s infinite`;
      root.appendChild(p);
    }
  }, [count]);

  return <div ref={ref} className="layer pointer-events-none" />;
}
