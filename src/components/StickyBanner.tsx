"use client";

import { useEffect, useRef } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";

export function StickyBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const currentY = window.scrollY;

        if (currentY <= 0) {
          wrapper.style.transform = "translateY(0)";
          wrapper.style.boxShadow = "none";
        } else if (currentY > lastYRef.current) {
          wrapper.style.transform = "translateY(-100%)";
          wrapper.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
        } else {
          wrapper.style.transform = "translateY(0)";
          wrapper.style.boxShadow = "0 1px 0 rgba(0,0,0,0.08)";
        }

        lastYRef.current = currentY;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#fff",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        /* willChange: "transform" intentionally omitted —
           it creates a stacking context that clips fixed-pos drawer */
      }}
    >
      <AnnouncementBar />
      <Header />
    </div>
  );
}
