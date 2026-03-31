import { cn } from "@/lib/utils";

type StatusPillProps = {
  status: string;
};

const toneMap: Record<string, string> = {
  Claimable: "bg-success/10 text-success",
  Pending: "bg-warning/10 text-warning",
  Released: "bg-primary/10 text-primary",
  Locked: "bg-slate-200 text-slate-500",
  Error: "bg-danger/10 text-danger",
  Ratio: "bg-accent/10 text-accent",
  Ready: "bg-success/10 text-success",
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-medium", toneMap[status] ?? "bg-slate-100 text-text-secondary")}>
      {status}
    </span>
  );
}
