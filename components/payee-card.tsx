import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { StatusPill } from "@/components/status-pill";
import { cn, formatAddress, formatAmount, formatPercent } from "@/lib/utils";

type PayeeCardProps = {
  address: `0x${string}`;
  shares: bigint;
  released: bigint;
  releasable: bigint;
  ratio: number;
  status: string;
};

export function PayeeCard({ address, shares, released, releasable, ratio, status }: PayeeCardProps) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-surface shadow-panel">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Payee</p>
          <p className="mt-1 font-mono text-sm font-semibold text-text-primary">{formatAddress(address)}</p>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="grid grid-cols-[1.25fr_0.75fr]">
        <div className="bg-slate-50 px-4 py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-text-secondary">Claimable</p>
              <p className="mt-2 text-2xl font-semibold text-success">{formatAmount(releasable)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">Ratio</p>
              <p className="mt-2 text-lg font-semibold text-accent">{formatPercent(ratio)}</p>
            </div>
          </div>

          <div className="mt-4 h-2 rounded-full bg-slate-200">
            <div className={cn("h-2 rounded-full bg-accent")} style={{ width: `${Math.max(8, Math.min(ratio, 100))}%` }} />
          </div>
        </div>

        <div className="flex flex-col justify-between px-4 py-4">
          <div>
            <p className="text-xs text-text-secondary">Released</p>
            <p className="mt-2 text-lg font-semibold text-primary">{formatAmount(released)}</p>
            <p className="mt-3 text-xs text-text-secondary">Shares</p>
            <p className="mt-1 text-base font-semibold text-text-primary">{shares.toString()}</p>
          </div>

          <Link href={`/payee/${address}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
            View
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
