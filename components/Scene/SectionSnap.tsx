import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";

type Props = {
  pages: number;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

export default function SectionSnap({ pages }: Props) {
  const scroll = useScroll();
  const animationRef = useRef<number>();
  const activeIndex = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const lastSnapTime = useRef(0);

  useEffect(() => {
    const element = scroll.el;
    if (!element) return;

    const maxIndex = pages - 1;

    function getSectionHeight() {
      return element.scrollHeight > element.clientHeight
        ? (element.scrollHeight - element.clientHeight) / maxIndex
        : element.clientHeight;
    }

    function syncActiveIndex() {
      activeIndex.current = clamp(
        Math.round(element.scrollTop / getSectionHeight()),
        0,
        maxIndex
      );
    }

    function animateTo(index: number) {
      const targetIndex = clamp(index, 0, maxIndex);
      const sectionHeight = getSectionHeight();
      const from = element.scrollTop;
      const to = targetIndex * sectionHeight;
      const startedAt = performance.now();
      const duration = 620;

      activeIndex.current = targetIndex;
      lastSnapTime.current = startedAt;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);

      const tick = (now: number) => {
        const progress = clamp((now - startedAt) / duration, 0, 1);
        element.scrollTop = from + (to - from) * easeOutCubic(progress);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(tick);
          return;
        }

        element.scrollTop = to;
        animationRef.current = undefined;
      };

      animationRef.current = requestAnimationFrame(tick);
    }

    function snapByDirection(direction: number) {
      syncActiveIndex();
      animateTo(activeIndex.current + direction);
    }

    function handleWheel(event: WheelEvent) {
      const now = performance.now();
      event.preventDefault();

      if (animationRef.current || now - lastSnapTime.current < 180) return;
      if (Math.abs(event.deltaY) < 16) return;

      snapByDirection(event.deltaY > 0 ? 1 : -1);
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    }

    function handleTouchMove(event: TouchEvent) {
      if (touchStartY.current !== null) event.preventDefault();
    }

    function handleTouchEnd(event: TouchEvent) {
      if (touchStartY.current === null) return;

      const endY = event.changedTouches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - endY;
      touchStartY.current = null;

      if (animationRef.current || Math.abs(delta) < 48) return;
      snapByDirection(delta > 0 ? 1 : -1);
    }

    function handleKeyDown(event: KeyboardEvent) {
      const forwardKeys = ["ArrowDown", "PageDown", " "];
      const backwardKeys = ["ArrowUp", "PageUp"];

      if (![...forwardKeys, ...backwardKeys].includes(event.key)) return;

      event.preventDefault();
      if (animationRef.current) return;

      snapByDirection(forwardKeys.includes(event.key) ? 1 : -1);
    }

    syncActiveIndex();
    element.style.scrollBehavior = "auto";
    element.addEventListener("wheel", handleWheel, { passive: false });
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchmove", handleTouchMove, { passive: false });
    element.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      element.removeEventListener("wheel", handleWheel);
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pages, scroll.el]);

  return null;
}
