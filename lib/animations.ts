import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initLenis() {
  if (prefersReducedMotion()) return;
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);
}

function initRevealOnScroll() {
  const sections = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      once: true,
      onEnter: () => section.classList.add("is-revealed"),
    });
  });
}

function initProjectCardParallax() {
  if (prefersReducedMotion()) return;
  const cards = document.querySelectorAll<HTMLElement>(
    ".project-card .project-image img"
  );
  cards.forEach((img) => {
    const parent = img.closest(".project-image") as HTMLElement | null;
    if (!parent) return;
    gsap.fromTo(
      img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: parent,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });
}

function initHeroImageParallax() {
  if (prefersReducedMotion()) return;
  const img = document.querySelector<HTMLElement>(".hero-image");
  if (!img) return;
  gsap.to(img, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: img.closest("section"),
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

let initialized = false;
export function initSiteAnimations() {
  if (typeof window === "undefined") return;
  if (initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger);

  const ready = () => {
    initLenis();
    initRevealOnScroll();
    initProjectCardParallax();
    initHeroImageParallax();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
}
