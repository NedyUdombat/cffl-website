"use client";

import { useState } from "react";

export function ColorSwatch({ color }: { color: string }) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  const scale = copied ? 1.2 : hovered ? 1.15 : 1;

  return (
    <button
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      type="button"
      aria-label={`Copy color ${color}`}
      title={`Copy ${color}`}
      style={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        backgroundColor: color,
        border: copied ? `1.5px solid ${color}` : "1.5px solid rgba(255,255,255,0.14)",
        transform: `scale(${scale})`,
        transition: "transform 0.15s ease, border-color 0.15s ease, outline-color 0.15s ease",
        cursor: "pointer",
        flexShrink: 0,
        outline: hovered || copied || focused ? `2px solid ${color}` : "none",
        outlineOffset: 2,
      }}
    />
  );
}
