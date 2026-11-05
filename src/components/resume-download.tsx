import { useRef, useState, type FormEvent } from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { useLang } from "@/i18n";

type Status = "idle" | "busy" | "wrong" | "limited" | "unavailable" | "network";

const statusFor = (code: number): Status => {
  if (code === 401 || code === 400) return "wrong";
  return code === 429 ? "limited" : "unavailable";
};

function saveFile(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lingshan.zhu-resume.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

/** Asks for a password, then fetches the resume from the server, which is the only place it can be read. */
export function ResumeDownload({ className = "pill" }: { className?: string }) {
  const { t, lang, zhOnly } = useLang();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const input = useRef<HTMLInputElement>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("busy");
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setStatus(statusFor(response.status));
        return;
      }
      saveFile(await response.blob());
      setOpen(false);
      setPassword("");
      setStatus("idle");
    } catch {
      setStatus("network");
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setStatus("idle");
        if (!next) setPassword("");
      }}
    >
      <Dialog.Trigger className={className}>
        DOWNLOAD PDF
        {lang === "zh" && <span lang="zh-CN">&nbsp;{t("resume.button")}</span>}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="resume-overlay" />
        <Dialog.Content
          className="resume-dialog"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            input.current?.focus();
          }}
        >
          <Dialog.Close className="resume-close" aria-label={t("resume.close")}>
            <X aria-hidden="true" />
          </Dialog.Close>
          <Dialog.Title className="resume-title">
            DOWNLOAD RESUME<b>.</b>
            {zhOnly(t("resume.button")) && (
              <span lang="zh-CN">{t("resume.button")}</span>
            )}
          </Dialog.Title>
          <Dialog.Description className="resume-note">
            {t("resume.note")}
          </Dialog.Description>
          <form className="resume-form" onSubmit={submit}>
            <label htmlFor="resume-password">{t("resume.password")}</label>
            <input
              ref={input}
              id="resume-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              required
              maxLength={200}
            />
            <button
              className="pill solid on-bone"
              type="submit"
              disabled={status === "busy"}
            >
              {t(status === "busy" ? "resume.busy" : "resume.submit")}
            </button>
          </form>
          <p className="resume-error" role="alert">
            {status !== "idle" && status !== "busy" && t(`resume.${status}`)}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
