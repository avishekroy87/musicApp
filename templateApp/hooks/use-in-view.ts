"use client";

import { RefObject, useEffect, useState } from "react";

export function useInView<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const [isInView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options, ref]);

  return isInView;
}
