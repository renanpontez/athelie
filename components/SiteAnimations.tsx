"use client";

import { useEffect } from "react";
import { initSiteAnimations } from "@/lib/animations";

export function SiteAnimations() {
  useEffect(() => {
    initSiteAnimations();
  }, []);
  return null;
}
