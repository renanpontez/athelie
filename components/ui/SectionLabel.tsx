type Props = {
  ordinal: string;
  label: string;
  total?: string;
};

export function SectionLabel({ ordinal, label, total = "07" }: Props) {
  return (
    <div className="flex items-baseline gap-3 font-mono-label text-stone">
      <span className="text-ink-2">{ordinal}</span>
      <span className="h-px w-8 bg-stone/60" />
      <span>{label}</span>
      <span className="text-stone/70 ml-1">/ {total}</span>
    </div>
  );
}
