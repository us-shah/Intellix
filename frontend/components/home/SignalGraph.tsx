"use client";

import { useEffect, useRef } from "react";

// Signature visual: a sparse, drifting node-and-edge graph that reads as
// "signal becoming structure" — raw data points on the left resolving into
// a connected network toward the right. Deliberately restrained: low node
// count, low opacity, no particles-everywhere noise.
export default function SignalGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    const COLORS = ["#2563EB", "#06B6D4", "#7C3AED"];

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : 500;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.min(38, Math.floor((width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.6 + 1
      }));
    }

    let animationId: number;
    let lastMouse = { x: -9999, y: -9999 };

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Update positions
      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw edges between nearby nodes
      const maxDist = Math.min(180, width / 5);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.18;
            ctx!.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        // Edge toward pointer for a subtle reactive feel
        const dxm = nodes[i].x - lastMouse.x;
        const dym = nodes[i].y - lastMouse.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 140) {
          ctx!.strokeStyle = `rgba(6, 182, 212, ${(1 - distm / 140) * 0.35})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(nodes[i].x, nodes[i].y);
          ctx!.lineTo(lastMouse.x, lastMouse.y);
          ctx!.stroke();
        }
      }

      // Draw nodes
      nodes.forEach((n, idx) => {
        ctx!.fillStyle = COLORS[idx % COLORS.length];
        ctx!.globalAlpha = 0.75;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      lastMouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", () => {
      lastMouse = { x: -9999, y: -9999 };
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70"
    />
  );
}
