/**
 * InfoRow - 아이콘과 텍스트를 표시하는 재사용 가능한 컴포넌트
 */
interface InfoRowProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

export function InfoRow({ icon: Icon, text }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4 text-slate-300">
      <Icon className="h-5 w-5 shrink-0 text-slate-500 mt-0.5" />
      <span className="font-mono text-sm leading-relaxed">{text}</span>
    </div>
  );
}
