import { CardShell } from "./CardShell";

/**
 * BaseCard - 공통 카드 레이아웃 추상화
 * ProfileCard와 ProjectCard의 중복 제거
 */
interface BaseCardProps {
  header: React.ReactNode;
  content?: React.ReactNode;
  footer: React.ReactNode;
  style?: React.CSSProperties;
}

export function BaseCard({ header, content, footer, style }: BaseCardProps) {
  return (
    <CardShell style={style}>
      <div className="relative z-10 flex h-[calc(100%-32px)] w-[calc(100%-32px)] flex-col justify-between">
        {/* Header Section */}
        <div className="flex w-full min-w-0 shrink-0 items-start justify-between gap-2">
          {header}
        </div>

        {/* Content Section (Optional) */}
        {content && (
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center py-2">
            {content}
          </div>
        )}

        {/* Footer Section */}
        <div className="flex w-full min-w-0 shrink-0 items-end justify-between gap-2">
          {footer}
        </div>
      </div>
    </CardShell>
  );
}
