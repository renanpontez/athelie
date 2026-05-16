import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  stroke?: string;
};

export function ArchIcon({ className, stroke = "currentColor" }: Props) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={cn("overflow-visible", className)}
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M5 100 V40 A35 35 0 0 1 75 40 V100" />
      <line x1="40" y1="20" x2="40" y2="62" />
      <path d="M30 62 A10 6 0 0 0 50 62" />
      <line x1="5" y1="100" x2="75" y2="100" />
      <line
        x1="5"
        y1="40"
        x2="75"
        y2="40"
        strokeOpacity="0.35"
        strokeDasharray="2 4"
      />
    </svg>
  );
}
