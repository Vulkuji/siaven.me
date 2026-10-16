import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { categoryOrder, profile, works, type Category } from "@/data/portfolio";
import {
  CategoryBadge,
  GlassFolder,
  Headline,
  Orbit,
} from "@/components/ornaments";

const badgePlacement: Record<Category, CSSProperties> = {
  medical: { left: "3%", top: "4%" },
  food: { left: "5%", bottom: "6%" },
  event: { right: "3%", bottom: "8%" },
  art: { left: "34%", bottom: 0 },
};

export function AboutView({ active }: { active: boolean }) {
  return (
    <section className="view view-about" hidden={!active} aria-label="关于">
      <div className="about">
        <div className="about-top">
          <p className="kicker">SELECTED WORKS PORTFOLIO</p>
          <p className="motto">make ideas visible</p>
        </div>
        <div className="about-stage">
          <Orbit className="about-orbit" />
          <div className="about-copy">
            <h2>好设计，有自己的表达。</h2>
            <p>
              我是 {profile.name}，一名{profile.role}
              ，专注品牌与视觉设计。在图形、色彩和信息之间，寻找恰当而鲜明的表达。从一个标志、一件包装，到屏幕与真实场景，让每个触点都保持清晰，也拥有个性。
            </p>
            <p className="note">IDEAS · PEOPLE · AND MORE</p>
          </div>
          <div className="about-badges">
            {categoryOrder.map((category) => (
              <CategoryBadge
                key={category}
                category={category}
                style={badgePlacement[category]}
              />
            ))}
          </div>
          <a
            className="folder-obj about-folder"
            href="#archive"
            aria-label="打开作品档案"
            data-cursor="打开档案 OPEN"
          >
            <GlassFolder count={works.length} />
            <span className="obj-pill glass-fill" aria-hidden="true">
              打开档案
            </span>
          </a>
        </div>
        <div className="about-foot">
          <span>DESIGN FOR A BRIGHTER TOMORROW</span>
          <a href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <Headline className="about-headline">
          <span className="en">make ideas</span>
          <span className="en">visible.</span>
        </Headline>
      </div>
    </section>
  );
}
