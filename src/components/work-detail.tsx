import { useEffect, useRef } from "react";
import { Dialog } from "radix-ui";
import { ArrowLeft } from "lucide-react";
import { categories, pad, works, type Work } from "@/data/portfolio";
import { SplitText } from "@/components/split-text";
import { useLang } from "@/i18n";

export function WorkDetail({
  work,
  onClose,
  onStep,
}: {
  work: Work | null;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const { t, pick } = useLang();
  const contentRef = useRef<HTMLDivElement>(null);
  const index = work ? works.indexOf(work) : -1;
  const title = work ? pick(work.title) : "";

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
                  {t("detail.back")}
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
                    {t("detail.prev")}
                  </button>
                  <button
                    type="button"
                    className="detail-button"
                    disabled={index === works.length - 1}
                    onClick={() => onStep(1)}
                  >
                    {t("detail.next")}
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
                      alt={t("detail.image", { title, index: imageIndex + 1 })}
                      loading={imageIndex ? "lazy" : "eager"}
                      decoding="async"
                    />
                  ))}
                </div>
                <div className="detail-info">
                  <p className="detail-label">
                    {categories[work.category].en.toUpperCase()} /{" "}
                    {work.label.en}
                  </p>
                  <Dialog.Title className="detail-title" aria-label={title}>
                    <SplitText text={title} />
                  </Dialog.Title>
                  <Dialog.Description className="detail-summary">
                    {pick(work.summary)}
                  </Dialog.Description>
                  {work.details.map((detail) => (
                    <section key={detail.key} className="detail-section">
                      <h3>{t(`detail.sections.${detail.key}`)}</h3>
                      <p>{pick(detail.text) || detail.text.zh}</p>
                    </section>
                  ))}
                  <dl className="detail-meta">
                    <dt>{t("detail.category")}</dt>
                    <dd>{pick(categories[work.category])}</dd>
                    <dt>{t("detail.type")}</dt>
                    <dd>{pick(work.label)}</dd>
                    <dt>{t("detail.images")}</dt>
                    <dd>
                      {t("detail.imageCount", { count: work.images.length })}
                    </dd>
                    <dt>{t("detail.number")}</dt>
                    <dd>
                      {pad(index + 1)} / {pad(works.length)}
                    </dd>
                  </dl>
                  <span className="detail-vertical" aria-hidden="true">
                    {t("detail.vertical", { number: pad(index + 1) })}
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
