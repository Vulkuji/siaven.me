import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { View } from "@/hooks/use-route";

const links: { view: View; href: string; zh: string; en: string }[] = [
  { view: "canvas", href: "#", zh: "作品", en: "WORKS" },
  { view: "archive", href: "#archive", zh: "档案", en: "ARCHIVE" },
  { view: "resume", href: "#resume", zh: "个人简历", en: "RESUME" },
];

export function Wordmark() {
  return (
    <span className="wordmark">
      <img src="/assets/google-avatar.png" alt="" width={256} height={256} />
      siaven
    </span>
  );
}

function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div className="mode-dots" role="group" aria-label="配色">
      {(["light", "dark"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-pressed={mounted && resolvedTheme === mode}
          onClick={() => setTheme(mode)}
        >
          {mode === "light" ? "浅色" : "深色"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader({ view }: { view?: View }) {
  return (
    <header className="site-head">
      <a href="#" aria-label="Siaven 首页">
        <Wordmark />
      </a>
      <nav className="site-nav" aria-label="网站导航">
        {links.map((link) => (
          <a
            key={link.view}
            href={link.href}
            aria-current={view === link.view ? "page" : undefined}
          >
            {link.zh}
            <small>{link.en}</small>
          </a>
        ))}
      </nav>
      <ModeToggle />
    </header>
  );
}
