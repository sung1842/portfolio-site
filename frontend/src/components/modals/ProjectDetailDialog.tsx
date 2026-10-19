"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ArchiveProjectModal } from "@/components/modals/ArchiveProjectModal";
import { OmrProjectModal } from "@/components/modals/OmrProjectModal";
import { AgentWaveLoader } from "@/components/ui/agent-wave-loader";
import type { Project } from "@/constants/Projects";
import { preloadProjectMedia } from "@/lib/media";
import { getProjectDetail } from "@/lib/projects";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const DETAIL_LOADING_LABEL = "DB에서 데이터 조회 중...";

interface ProjectDetailDialogProps {
  /** List-card seed used for shell / layoutId while full detail loads */
  project: Project | undefined;
  onClose: () => void;
}

/**
 * View All (/projects) detail overlay only.
 * Opens immediately, fetches full detail from Supabase, then renders case study body.
 */
export function ProjectDetailDialog({ project, onClose }: ProjectDetailDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const ignoreBackdropClickRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) {
      setDetail(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setDetail(null);
    setIsLoading(true);

    void getProjectDetail(project.id)
      .then(async (row) => {
        if (cancelled) return;
        const next = row ?? project;
        if (typeof window !== "undefined") {
          await preloadProjectMedia(next.image);
        }
        if (cancelled) return;
        setDetail(next);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error("[ProjectDetailDialog] detail fetch failed:", error);
        setDetail(project);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;

    ignoreBackdropClickRef.current = true;
    const allowBackdrop = window.setTimeout(() => {
      ignoreBackdropClickRef.current = false;
    }, 250);

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.clearTimeout(allowBackdrop);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  const handleBackdropClick = useCallback(() => {
    if (ignoreBackdropClickRef.current) return;
    onClose();
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <motion.div
            ref={panelRef}
            layoutId={`archive-card-${project.id}`}
            className="dark flex flex-col overflow-hidden backdrop-blur-2xl"
            style={{
              position: "relative",
              width: "94vw",
              height: "90vh",
              maxHeight: "90vh",
              flexShrink: 0,
              backgroundColor: "rgba(18,18,18,0.95)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 18,
              boxShadow: "0 0 50px rgba(0,0,0,0.95), 0 40px 100px rgba(0,0,0,0.35)",
            }}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="archive-modal-title"
            aria-busy={isLoading}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="닫기"
              style={{
                position: "absolute",
                right: 16,
                top: 16,
                zIndex: 50,
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#000000",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.25), 0 4px 14px rgba(255,255,255,0.15)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.opacity = "0.75";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.opacity = "1";
              }}
            >
              <X
                style={{
                  width: 14,
                  height: 14,
                  color: "#ffffff",
                  strokeWidth: 2.5,
                  display: "block",
                }}
                aria-hidden="true"
              />
            </button>

            <h2 id="archive-modal-title" className="sr-only">
              {project.title} 프로젝트 상세
            </h2>

            <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden">
              {isLoading || !detail ? (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AgentWaveLoader label={DETAIL_LOADING_LABEL} durationMs={2600} className="scale-150" />
                </div>
              ) : detail.id === 3 ? (
                <OmrProjectModal project={detail} />
              ) : (
                <ArchiveProjectModal project={detail} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
