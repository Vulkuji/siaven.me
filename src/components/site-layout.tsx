import { ArrowUpRight, ArrowUp, Asterisk } from "lucide-react";
import { m } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { contactEmail } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-display text-[36px] font-extrabold leading-none tracking-[-2.5px] max-[720px]:text-[24px]",
        className,
      )}
    >
      <Avatar aria-hidden="true" className="mr-[.18em] size-[.85em]">
        <AvatarImage src="/assets/google-avatar.png" alt="" />
        <AvatarFallback className="bg-highlight text-[.5em] text-highlight-foreground">
          S
        </AvatarFallback>
      </Avatar>
      siaven
    </span>
  );
}

export function SiteHeader() {
  return (
    <>
      <a
        href="#work"
        className="fixed -top-20 left-5 z-50 rounded bg-background p-3 focus:top-3"
      >
        跳至作品
      </a>
      <header className="site-header">
        <div className="header-shell">
          <a href="#top" aria-label="Siaven 首页">
            <Wordmark />
          </a>
          <span className="text-[9px] tracking-[.15em] text-muted-foreground max-[1050px]:hidden">
            A DIFFERENT POINT OF VIEW.
          </span>
          <div className="flex items-center gap-3 min-[721px]:gap-6 max-[380px]:gap-1">
            <NavigationMenu aria-label="主导航" viewport={false}>
              <NavigationMenuList className="gap-1 min-[721px]:gap-5">
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="items-baseline text-[13px] hover:text-primary min-[721px]:text-sm"
                  >
                    <a href="#work">
                      作品
                      <span className="text-[10px] text-muted-foreground max-[720px]:hidden">
                        Work
                      </span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="items-baseline text-[13px] hover:text-primary min-[721px]:text-sm"
                  >
                    <a href="#about">
                      关于
                      <span className="text-[10px] text-muted-foreground max-[720px]:hidden">
                        About
                      </span>
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="about-section">
      <div>
        <p className="eyebrow mb-8 text-muted-foreground">02 / 关于 SIAVEN</p>
        <div className="about-graphic" aria-hidden="true">
          IDEAS
          <br />
          <div className="flex items-center gap-4">
            <Asterisk strokeWidth={1.2} />
            <span className="about-outline">INTO</span>
          </div>
          IMPACT.
        </div>
      </div>
      <m.div
        initial={{ y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        className="min-[721px]:pt-14"
      >
        <h2
          id="about-title"
          className="text-[clamp(32px,3.7vw,56px)] font-semibold leading-[1.4] tracking-[-.055em]"
        >
          好设计，
          <br />
          有自己的表达。
        </h2>
        <p className="mt-7 text-lg font-medium leading-loose">
          我是 Siaven，专注品牌与视觉设计。
        </p>
        <p className="mt-4 max-w-[440px] text-sm leading-loose text-muted-foreground">
          在图形、色彩和信息之间，寻找恰当而鲜明的表达。从一个标志、一件包装，到屏幕与真实场景，让每个触点都保持清晰，也拥有个性。
        </p>
        <ul
          aria-label="设计领域"
          className="mt-8 flex max-w-[470px] flex-wrap gap-2.5"
        >
          {["品牌视觉", "包装与印刷", "活动传播", "界面与信息设计"].map(
            (skill) => (
              <li key={skill}>
                <Badge
                  variant="outline"
                  className="h-auto rounded-full px-4 py-3 text-xs font-normal"
                >
                  {skill}
                </Badge>
              </li>
            ),
          )}
        </ul>
      </m.div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1600px] border-t px-[var(--gutter)] pb-6">
      <div className="flex flex-wrap items-center justify-between gap-5 border-b py-7">
        <p className="eyebrow text-muted-foreground max-[540px]:hidden">
          KEEP IN TOUCH.
        </p>
        <Button
          asChild
          variant="link"
          className="h-auto max-w-full gap-3 p-0 text-sm font-normal text-foreground hover:text-primary"
        >
          <a
            href={`mailto:${contactEmail}`}
            aria-label={`联系邮箱 ${contactEmail}`}
          >
            <span>{contactEmail}</span>
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-full border border-border"
          aria-label="回到顶部"
        >
          <a href="#top">
            <ArrowUp aria-hidden="true" className="size-4" />
          </a>
        </Button>
      </div>
      <div className="footer-display">
        <a href="#top" aria-label="Siaven 首页" className="inline-block">
          <Wordmark className="text-[clamp(90px,20vw,300px)] leading-[.85] tracking-[-.085em] max-[720px]:text-[clamp(72px,19vw,140px)]" />
        </a>
      </div>
      <div className="flex items-center justify-between gap-4 text-[9px] tracking-wider text-muted-foreground">
        <p>© 2026 SIAVEN</p>
        <p>
          IDEAS INTO VISUALS. <span aria-hidden="true">↗</span>
        </p>
      </div>
    </footer>
  );
}
