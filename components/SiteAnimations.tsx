"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  initLenisOnce,
  rebindScrollAnimations,
  scrollToTop,
} from "@/lib/animations";

export function SiteAnimations() {
  const pathname = usePathname();

  // session-singleton: init Lenis once
  useEffect(() => {
    initLenisOnce();
  }, []);

  // on every route change: jump to top + rebind scroll triggers for the new DOM
  useEffect(() => {
    scrollToTop(true);

    // wait one frame so the new page's nodes are mounted
    const id = requestAnimationFrame(() => {
      rebindScrollAnimations();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
