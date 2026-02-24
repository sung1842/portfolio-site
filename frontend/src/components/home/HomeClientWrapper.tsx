"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Carousel3D } from "@/components/carousel/Carousel3D";
import type { Project } from "@/constants/Projects";

const ProjectModal = dynamic(
  () => import("@/components/modals/ProjectModal").then((m) => ({ default: m.ProjectModal })),
  { ssr: false }
);

interface HomeClientWrapperProps {
  projects: Project[];
}

/**
 * Client boundary for the home page: 3D Carousel + Project detail modal.
 * Keeps "use client" at the leaf so the rest of the page can remain Server Components.
 */
export function HomeClientWrapper({ projects }: HomeClientWrapperProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = selectedId !== null ? projects.find((p) => p.id === selectedId) : undefined;

  const closeModal = useCallback(() => setSelectedId(null), []);

  useEffect(() => {
    if (!selectedProject) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedProject, closeModal]);

  return (
    <>
      {/* 3D Carousel — same wrapper as before for layout */}
      <div className="relative w-full flex items-center justify-center h-[62dvh] min-h-[300px] max-h-[600px] z-20">
        <Carousel3D
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onItemSelect={setSelectedId}
          selectedId={selectedId}
        />
      </div>

      {/* Modal overlay + Project detail */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ backgroundColor: "rgba(200, 200, 200, 0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              aria-hidden="true"
            />

            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              className="fixed left-1/2 top-1/2 z-50 flex h-[90vh] w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-white/15 backdrop-blur-2xl"
              style={{
                backgroundColor: "rgba(18,18,18,0.95)",
                borderRadius: 18,
                boxShadow: "0 0 50px rgba(0,0,0,0.95), 0 40px 100px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, scale: 0.93, y: "-48%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: "-48%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                type="button"
                onClick={closeModal}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.75";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
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

              <div id="modal-title" className="sr-only">
                {selectedProject.title} 상세 정보
              </div>

              <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
                <ProjectModal project={selectedProject} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
