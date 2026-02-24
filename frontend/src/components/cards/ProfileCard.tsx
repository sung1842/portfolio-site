import Image from "next/image";
import { Cpu } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { PROFILE_CARD_STYLE } from "@/config/design";

/**
 * ProfileCard - 프로필 카드 컴포넌트 (BaseCard 활용)
 */
export function ProfileCard() {
  const cardStyle = {
    backgroundColor: PROFILE_CARD_STYLE.base,
    backgroundImage: [
      `radial-gradient(circle at 0% 0%, rgba(204, 255, 0, 0.6) 0%, transparent 40%)`,
      `radial-gradient(circle at 100% 100%, rgba(0, 240, 255, 0.6) 0%, transparent 40%)`,
    ].join(", "),
    border: `1px solid ${PROFILE_CARD_STYLE.electricCyan}40`,
    boxShadow: `0 0 30px ${PROFILE_CARD_STYLE.glowCyan}`,
  };

  const header = (
    <>
      <div className="min-w-0 flex-1 flex flex-col">
        <span
          className="font-mono text-xs font-bold tracking-tighter text-white sm:text-sm"
          style={{ textShadow: `0 0 12px ${PROFILE_CARD_STYLE.electricCyan}` }}
        >
          PORTFOLIO
        </span>
      </div>
      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs">
        MORE &gt;
      </div>
    </>
  );

  const content = (
    <div className="relative flex items-center justify-center overflow-hidden rounded-xl">
      <Image
        src="/image_10.png"
        alt="Oh Sungwoo 프로필"
        width={120}
        height={120}
        className="rounded-xl object-cover"
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        style={{
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );

  const footer = (
    <>
      <div className="min-w-0 flex-1">
        <h2
          className="truncate text-base font-bold leading-none tracking-tight text-white sm:text-lg md:text-xl"
          style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
        >
          OH SUNGWOO
        </h2>
        <div className="mt-1 flex items-center gap-1.5 text-white/80">
          <span className="min-w-0 truncate font-mono text-[10px] sm:text-xs">
            WEB Full-Stack Developer
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end text-white/70">
        <Cpu className="mb-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        <span className="font-mono text-[10px] sm:text-xs">ID: 2026-X86</span>
      </div>
    </>
  );

  return <BaseCard header={header} content={content} footer={footer} style={cardStyle} />;
}
