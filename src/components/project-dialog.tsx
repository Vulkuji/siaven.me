import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Wordmark } from "@/components/site-layout";
import { works, type Work } from "@/data/portfolio";

type ProjectDialogProps = {
  work: Work;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStep: (direction: -1 | 1) => void;
  returnFocus: () => void;
};

export function ProjectDialog({
  work,
  index,
  open,
  onOpenChange,
  onStep,
  returnFocus,
}: ProjectDialogProps) {
  const scrollArea = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollArea.current) scrollArea.current.scrollTop = 0;
  }, [work.id, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          returnFocus();
        }}
        className="project-dialog grid h-[calc(100dvh-48px)] w-[calc(100vw-48px)] max-w-[1200px] grid-rows-[auto_1fr] gap-0 overflow-hidden border-0 bg-background p-0 sm:max-w-[1200px] max-[720px]:h-dvh max-[720px]:w-screen max-[720px]:max-w-none max-[720px]:rounded-none"
      >
        <div className="flex h-[68px] items-center justify-between gap-5 border-b px-7 max-[720px]:h-[62px] max-[720px]:px-5">
          <Wordmark className="text-2xl max-[720px]:text-2xl" />
          <span
            aria-label="作品位置"
            className="text-[10px] text-muted-foreground tabular-nums"
          >
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(works.length).padStart(2, "0")}
          </span>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="关闭作品详情"
              className="close-button gap-3 font-normal"
            >
              关闭
              <X aria-hidden="true" className="size-5" />
            </Button>
          </DialogClose>
        </div>
        <ScrollArea
          type="scroll"
          scrollHideDelay={250}
          className="min-h-0"
          viewportProps={{
            ref: scrollArea,
            className: "dialog-scroll overscroll-contain",
            tabIndex: 0,
            role: "region",
            "aria-label": `${work.title}作品内容`,
          }}
        >
          <div className="px-10 pt-11 pb-9 max-[720px]:px-[22px] max-[720px]:pt-7 max-[720px]:pb-6">
            <p className="eyebrow mb-4 text-primary">{work.label}</p>
            <DialogTitle className="text-[clamp(24px,3vw,38px)] font-semibold tracking-[-1px]">
              {work.title}
            </DialogTitle>
            <DialogDescription className="mt-[18px] max-w-[650px] text-sm leading-[1.9] max-[720px]:text-[13px]">
              {work.description}
            </DialogDescription>
          </div>
          <div className="project-images px-6 max-[720px]:px-0">
            {work.images.map((asset, position) => (
              <a
                key={asset.src}
                href={asset.src}
                target="_blank"
                rel="noopener"
                aria-label={`${work.title}，第 ${position + 1} 张，查看完整图片`}
                className="mb-5 block bg-white max-[720px]:mb-3"
              >
                <img
                  src={asset.src}
                  alt={`${work.title} — 设计展示 ${position + 1}`}
                  width={asset.width}
                  height={asset.height}
                  loading={position === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-auto w-full"
                />
              </a>
            ))}
          </div>
          <div className="flex justify-between gap-5 px-10 pt-7 pb-11 max-[720px]:px-[22px] max-[720px]:pt-4 max-[720px]:pb-7">
            <Button
              variant="ghost"
              disabled={index === 0}
              onClick={() => onStep(-1)}
              className="previous-project px-0 font-normal"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              上一件作品
            </Button>
            <Button
              variant="ghost"
              disabled={index === works.length - 1}
              onClick={() => onStep(1)}
              className="next-project px-0 font-normal"
            >
              下一件作品
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
