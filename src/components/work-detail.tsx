import { useEffect, useRef } from "react";
import { Dialog } from "radix-ui";
import { ArrowLeft } from "lucide-react";
import { categories, pad, works, type Work } from "@/data/portfolio";
import { SplitText } from "@/components/split-text";

export function WorkDetail({
  work,
  onClose,
  onStep,
}: {
  work: Work | null;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const index = work ? works.indexOf(work) : -1;

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [work]);

  return (
    <Dialog.Root
      open={Boolean(work)}
      onOpenChange={(open) => !open && onClose()}
    >
      <Dialog.Portal>
        <Dialog.Content
          ref={contentRef}
          className="detail"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") onStep(-1);
            if (event.key === "ArrowRight") onStep(1);
          }}
        >
          {work && (
            <>
              <div className="detail-bar">
                <Dialog.Close className="detail-button">
                  <ArrowLeft aria-hidden="true" />
                  返回 BACK
                </Dialog.Close>
                <span className="detail-count">
                  {pad(index + 1)} / {pad(works.length)}
                </span>
                <span className="detail-nav">
                  <button
                    type="button"
                    className="detail-button"
                    disabled={index === 0}
                    onClick={() => onStep(-1)}
                  >
                    上一个 PREV
                  </button>
                  <button
                    type="button"
                    className="detail-button"
                    disabled={index === works.length - 1}
                    onClick={() => onStep(1)}
                  >
                    下一个 NEXT
                  </button>
                </span>
              </div>
              <div className="detail-body" key={work.id}>
                <div className="detail-media">
                  {work.images.map((image, imageIndex) => (
                    <img
                      key={image.src}
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt={`${work.title} 第 ${imageIndex + 1} 张`}
                      loading={imageIndex ? "lazy" : "eager"}
                      decoding="async"
                    />
                  ))}
                </div>
                <div className="detail-info">
                  <p className="detail-label">
                    {categories[work.category].en} / {work.label}
                  </p>
                  <Dialog.Title
                    className="detail-title"
                    aria-label={work.title}
                  >
                    <SplitText text={work.title} />
                  </Dialog.Title>
                  <Dialog.Description className="detail-summary">
                    {work.summary}
                  </Dialog.Description>
                  {work.details.map((detail) => (
                    <section key={detail.label} className="detail-section">
                      <h3>{detail.label}</h3>
                      <p>{detail.text}</p>
                    </section>
                  ))}
                  <dl className="detail-meta">
                    <dt>分类</dt>
                    <dd>{categories[work.category].zh}</dd>
                    <dt>类型</dt>
                    <dd>{work.label.split(" / ")[0]}</dd>
                    <dt>图片</dt>
                    <dd>{work.images.length} 张</dd>
                    <dt>序号</dt>
                    <dd>
                      {pad(index + 1)} / {pad(works.length)}
                    </dd>
                  </dl>
                  <span className="detail-vertical" aria-hidden="true">
                    作品档案 No.{pad(index + 1)}
                  </span>
                </div>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
