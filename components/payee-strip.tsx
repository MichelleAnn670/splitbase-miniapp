import Link from "next/link";

import { formatAddress } from "@/lib/utils";

type PayeeStripProps = {
  payees: `0x${string}`[];
};

export function PayeeStrip({ payees }: PayeeStripProps) {
  const visible = payees.slice(0, 8);

  return (
    <div className="scrollbar-none flex gap-3 overflow-x-auto pb-1">
      {visible.map((payee, index) => (
        <Link
          key={payee}
          href={`/payee/${payee}`}
          className="min-w-[140px] rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-text-secondary">
            #{(index + 1).toString().padStart(2, "0")}
          </p>
          <p className="mt-3 font-mono text-sm font-semibold text-text-primary">{formatAddress(payee)}</p>
          <p className="mt-4 text-xs text-primary">View</p>
        </Link>
      ))}
      {visible.length === 0 ? (
        <div className="min-w-full rounded-[24px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-sm text-text-secondary">
          No payees loaded yet.
        </div>
      ) : null}
    </div>
  );
}
