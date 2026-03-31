"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink, Wallet } from "lucide-react";
import { useReadContracts } from "wagmi";

import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";
import { splitBaseContract } from "@/lib/contracts";
import { formatAddress, formatAmount, formatPercent, getExplorerUrl, getShareStatus } from "@/lib/utils";

export default function PayeeDetailPage() {
  const params = useParams<{ address: string }>();
  const payee = (params.address || "0x0000000000000000000000000000000000000000") as `0x${string}`;
  const { data } = useReadContracts({
    contracts: [
      { ...splitBaseContract, functionName: "totalShares" },
      { ...splitBaseContract, functionName: "shares", args: [payee] },
      { ...splitBaseContract, functionName: "released", args: [payee] },
      { ...splitBaseContract, functionName: "releasable", args: [payee] },
    ],
  });

  const totalShares = (data?.[0]?.result as bigint | undefined) ?? 0n;
  const shares = (data?.[1]?.result as bigint | undefined) ?? 0n;
  const released = (data?.[2]?.result as bigint | undefined) ?? 0n;
  const releasable = (data?.[3]?.result as bigint | undefined) ?? 0n;
  const ratio = totalShares > 0n ? Number((shares * 10000n) / totalShares) / 100 : 0;
  const status = getShareStatus(releasable, released, shares);

  return (
    <div className="space-y-4">
      <section className="rounded-[28px] bg-surface p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <Link
            href="/records"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-text-primary"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          <StatusPill status={status} />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <div className="rounded-3xl bg-primary/10 p-3 text-primary">
            <Wallet size={22} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Payee</p>
            <h1 className="mt-1 font-mono text-lg font-semibold">{formatAddress(payee)}</h1>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Releasable</p>
            <p className="mt-2 text-2xl font-semibold text-success">{formatAmount(releasable)} ETH</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Ratio</p>
            <p className="mt-2 text-2xl font-semibold text-accent">{formatPercent(ratio)}</p>
          </div>
        </div>
      </section>

      <StatGrid
        items={[
          { label: "Shares", value: shares.toString(), tone: "ratio" },
          { label: "Released", value: `${formatAmount(released)} ETH`, tone: "released" },
          { label: "Claimable", value: `${formatAmount(releasable)} ETH`, tone: "claimable" },
          { label: "Pool", value: totalShares.toString(), tone: "default" },
        ]}
      />

      <section className="rounded-[28px] bg-surface p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Onchain</p>
            <h2 className="mt-1 text-lg font-semibold">Address State</h2>
          </div>
          <a
            href={getExplorerUrl(payee)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm"
          >
            Open
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Address</p>
            <p className="mt-2 break-all font-mono text-sm text-text-primary">{payee}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Contract</p>
            <p className="mt-2 break-all font-mono text-sm text-text-primary">
              {splitBaseContract.address}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
