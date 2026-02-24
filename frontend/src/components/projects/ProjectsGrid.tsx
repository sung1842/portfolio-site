"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, Github, X } from "lucide-react";
import { portfolioProjects, allTechTags, isVideoAsset, type ProjectCategory } from "@/constants/Projects";
import { getProjectIcon } from "@/utils/projectHelpers";
import { getProjectNeonStyle } from "@/utils/neonStyles";

const CATEGORIES: ProjectCategory[] = ["AI Project", "E-Commerce", "Web App", "Mobile"];

/**
 * ProjectsGrid - 필터링 가능한 프로젝트 전체 보기 그리드
 */
export function ProjectsGrid() {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridVisible = useInView(gridRef, { once: true, margin: "-50px" });

  const filtered = useMemo(() => {
    return portfolioProjects.filter((p) => {
      const categoryMatch = !selectedCategory || p.category === selectedCategory;
      const techMatch =
        selectedTech.length === 0 ||
        selectedTech.every((t) => p.tech.includes(t));
      return categoryMatch && techMatch;
    });
  }, [selectedTech, selectedCategory]);

  function toggleTech(tag: string) {
    setSelectedTech((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearFilters() {
    setSelectedTech([]);
    setSelectedCategory(null);
  }

  const hasFilters = selectedTech.length > 0 || selectedCategory !== null;

  return (
    <div className="flex flex-col gap-8">
      {/* 필터 패널 */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        {/* 카테고리 필터 */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/40">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200 ${
                  selectedCategory === cat
                    ? "border-white/60 bg-white text-black"
                    : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/90"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 기술 스택 필터 */}
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/40">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {allTechTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTech(tag)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200 ${
                  selectedTech.includes(tag)
                    ? "border-white/60 bg-white text-black"
                    : "border-white/15 bg-white/5 text-white/60 hover:border-white/30 hover:text-white/90"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 필터 초기화 */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex w-fit items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-xs text-red-400 transition hover:bg-red-500/20"
          >
            <X className="h-3 w-3" />
            필터 초기화
          </button>
        )}
      </div>

      {/* 결과 카운트 */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-sm text-white/40">
          <span className="text-white">{filtered.length}</span> / {portfolioProjects.length} projects
        </p>
      </div>

      {/* 프로젝트 그리드 - useInView로 스크롤 기반 reveal */}
      <motion.div
        ref={gridRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={isGridVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((project) => {
              const Icon = getProjectIcon(project);
              const neonStyle = getProjectNeonStyle(project);
              const isVideo = isVideoAsset(project.image);
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                  style={{
                    boxShadow: neonStyle.boxShadow,
                  }}
                >
                  {/* 카드 상단 - 비디오 또는 네온 그라디언트 헤더 */}
                  <div
                    className="relative flex h-36 items-center justify-center overflow-hidden"
                    style={{
                      background: neonStyle.backgroundImage
                        ? `${neonStyle.backgroundImage}, ${neonStyle.backgroundColor ?? "#0a0a0a"}`
                        : neonStyle.backgroundColor ?? "#0a0a0a",
                    }}
                    aria-hidden="true"
                  >
                    {isVideo ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-50"
                      />
                    ) : null}
                    <Icon className="relative z-10 h-16 w-16 text-white/10 transition-all duration-500 group-hover:text-white/20" />
                  </div>

                  {/* 카드 본문 */}
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    {/* 카테고리 */}
                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white/50">
                      {project.category}
                    </span>

                    {/* 제목 & 설명 */}
                    <div>
                      <h3 className="font-bold text-white">{project.title}</h3>
                      <p className="mt-1 text-sm text-white/50 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* 기술 스택 */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ring-1 transition-colors ${
                            selectedTech.includes(t)
                              ? "bg-white text-black ring-white"
                              : "text-white/50 ring-white/10"
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* 링크 버튼 */}
                    <div className="mt-auto flex gap-3 pt-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                          aria-label={`${project.title} GitHub 저장소`}
                        >
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                          GitHub
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
                          aria-label={`${project.title} 라이브 데모`}
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center gap-3 py-20 text-white/30"
            >
              <p className="font-mono text-sm">조건에 맞는 프로젝트가 없습니다.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-white/20 px-4 py-1.5 text-xs transition hover:text-white"
              >
                필터 초기화
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 홈으로 돌아가기 */}
      <div className="mt-4 flex justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          ← 홈으로
        </Link>
      </div>
    </div>
  );
}
