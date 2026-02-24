import { clsx } from "clsx";
import { DESIGN_CONFIG } from "@/config/design";

/**
 * CardShell - 모든 카드의 기본 래퍼
 */
interface CardShellProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CardShell({ children, className, style }: CardShellProps) {
  return (
    <div
      className={clsx(
        "relative box-border h-full w-full overflow-hidden text-white shadow-2xl",
        "flex items-center justify-center p-8 md:p-12",
        className
      )}
      style={{
        borderRadius: DESIGN_CONFIG.card.borderRadius,
        backgroundColor: DESIGN_CONFIG.colors.cardBg,
        ...style,
      }}
      role="article"
      aria-label="Project card"
    >
      {children}
    </div>
  );
}
