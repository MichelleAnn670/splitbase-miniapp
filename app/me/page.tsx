"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CircleAlert, Wallet } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";

import { ReleasePanel } from "@/components/release-panel";
import { StatGrid } from "@/components/stat-grid";
import { StatusPill } from "@/components/status-pill";
import { splitBaseContract } from "@/lib/contracts";
import { formatAddress, formatAmount, formatPercent, getShareStatus } from "@/lib/utils";

export default function MePage() {
  const { address, isConnected } = useAccount();
  const account = address ?? "0x0000000000000000000000000000000000000000";

  const { data } = useReadContracts({
    contracts: [
      { ...splitBaseContract, functionName: "totalShares" },
      { ...splitBaseContract, functionName: "shares", args: [account] },
      { ...splitBaseContract, functionName: "released", args: [account] },
      { ...splitBaseContract, functionName: "releasable", args: [account] },
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
      <section className="rounded-[28px] bg-surface bg-panel-grid p-5 shadow-panel">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-text-secondary">Me</p>
            <h1 className="mt-1 text-2xl font-semibold">Personal Split</h1>
          </div>
          <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
        </div>

        <div className="mt-5 flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-2 text-primary shadow-sm">
              <Wallet size={18} />
            </div>
            <div>
              <p className="text-xs text-text-secondary">Address</p>
              <p className="font-mono text-sm text-text-primary">
                {isConnected ? formatAddress(account) : "Wallet idle"}
              </p>
            </div>
          </div>
          <StatusPill status={status} />
        </div>

        {!isConnected ? (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white/70 px-4 py-3 text-sm text-text-secondary">
            <CircleAlert size={16} className="text-warning" />
            Connect to view your live split state.
          </div>
        ) : null}
      </section>

      <section className="grid grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="rounded-[28px] bg-surface p-5 shadow-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Claimable</p>
          <p className="mt-3 text-3xl font-semibold text-success">{formatAmount(releasable)} ETH</p>
          <p className="mt-1 text-sm text-text-secondary">Ready now</p>
          <div className="mt-4">
            <ReleasePanel account={account} amount={releasable} compact />
          </div>
        </div>

        <div className="rounded-[28px] bg-accent p-5 text-white shadow-panel">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Ratio</p>
          <p className="mt-3 text-3xl font-semibold">{formatPercent(ratio)}</p>
          <p className="mt-2 text-sm text-white/70">{shares.toString()} shares</p>
        </div>
      </section>

      <StatGrid
        items={[
          { label: "Released", value: `${formatAmount(released)} ETH`, tone: "released" },
          { label: "Shares", value: shares.toString(), tone: "ratio" },
          { label: "Status", value: status, tone: status.toLowerCase() as "claimable" | "released" | "pending" | "locked" | "error" | "ratio" },
          { label: "Pool", value: totalShares.toString(), tone: "default" },
        ]}
      />

      <section className="rounded-[28px] bg-surface p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Quick Tags</p>
            <h2 className="mt-1 text-lg font-semibold">Payout Signals</h2>
          </div>
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-text-secondary">
            live
          </div>
        </div>
        <div className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-1">
          {[
            { label: "Share", value: `${shares.toString()} units` },
            { label: "Released", value: formatAmount(released) },
            { label: "Claimable", value: formatAmount(releasable) },
            { label: "State", value: status },
          ].map((tag) => (
            <div
              key={tag.label}
              className="min-w-[132px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="text-xs text-text-secondary">{tag.label}</p>
              <p className="mt-2 text-sm font-medium text-text-primary">{tag.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
