import { useEffect, useState } from "react";

/** Tells whether the section passing under the fixed header is a light one. */
export function useGround(key: unknown) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll(".sec");
    if (!sections.length) {
      setLight(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setLight(entry.target.classList.contains("t-bone"));
        }
      },
      { rootMargin: "-28px 0px -95% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return light;
}
