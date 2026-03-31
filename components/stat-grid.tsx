import { cn } from "@/lib/utils";

type StatItem = {
  label: string;
  value: string;
  tone: "claimable" | "released" | "pending" | "locked" | "error" | "ratio" | "default";
};

type StatGridProps = {
  items: StatItem[];
};

const toneStyles: Record<StatItem["tone"], string> = {
  claimable: "text-success",
  released: "text-primary",
  pending: "text-warning",
  locked: "text-slate-500",
  error: "text-danger",
  ratio: "text-accent",
  default: "text-text-primary",
};

export function StatGrid({ items }: StatGridProps) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-[26px] bg-surface p-4 shadow-panel">
          <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">{item.label}</p>
          <p className={cn("mt-3 text-xl font-semibold", toneStyles[item.tone])}>{item.value}</p>
        </div>
      ))}
    </section>
  );
}
