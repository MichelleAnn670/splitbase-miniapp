"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";

import { PayeeStrip } from "@/components/payee-strip";
import { ReleasePanel } from "@/components/release-panel";
import { StatGrid } from "@/components/stat-grid";
import { splitBaseContract } from "@/lib/contracts";
import { formatAmount, formatPercent } from "@/lib/utils";

export function SplitDashboard() {
  const { address, isConnected } = useAccount();
  const account = address ?? "0x0000000000000000000000000000000000000000";

  const { data } = useReadContracts({
    contracts: [
      { ...splitBaseContract, functionName: "totalReceived" },
      { ...splitBaseContract, functionName: "totalReleased" },
      { ...splitBaseContract, functionName: "totalShares" },
      { ...splitBaseContract, functionName: "shares", args: [account] },
      { ...splitBaseContract, functionName: "releasable", args: [account] },
    ],
  });

  const { data: payees } = useReadContract({
    ...splitBaseContract,
    functionName: "getPayees",
  });

  const totalReceived = (data?.[0]?.result as bigint | undefined) ?? 0n;
  const totalReleased = (data?.[1]?.result as bigint | undefined) ?? 0n;
  const totalShares = (data?.[2]?.result as bigint | undefined) ?? 0n;
  const myShares = (data?.[3]?.result as bigint | undefined) ?? 0n;
  const releasable = (data?.[4]?.result as bigint | undefined) ?? 0n;
  const ratio = totalShares > 0n ? Number((myShares * 10000n) / totalShares) / 100 : 0;
  const payeeCount = (payees?.length ?? 0).toString();

  return (
    <div className="space-y-4">
      <section className="rounded-[32px] bg-surface bg-panel-grid p-5 shadow-panel">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-text-secondary">SplitBase</p>
            <h1 className="mt-2 text-[2rem] font-semibold leading-none">Split State</h1>
          </div>
          <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
        </div>

        <div className="mt-6 grid grid-cols-[1.15fr_0.85fr] gap-3">
          <div className="rounded-[28px] bg-primary p-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">Total Received</p>
            <p className="mt-4 text-3xl font-semibold">{formatAmount(totalReceived)} ETH</p>
            <div className="mt-5 flex items-center justify-between text-sm text-white/75">
              <span>Total Released</span>
              <span>{formatAmount(totalReleased)} ETH</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Releasable</p>
              <p className="mt-3 text-2xl font-semibold text-success">{formatAmount(releasable)} ETH</p>
              <p className="mt-1 text-sm text-text-secondary">My live claim</p>
            </div>
            <div className="rounded-[28px] bg-accent p-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Ratio</p>
              <p className="mt-3 text-2xl font-semibold">{formatPercent(ratio)}</p>
              <p className="mt-1 text-sm text-white/70">{myShares.toString()} shares</p>
            </div>
          </div>
        </div>

        {!isConnected ? (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-text-secondary">
            <CircleAlert size={16} className="text-warning" />
            Wallet optional for browsing, needed for live claim.
          </div>
        ) : null}

        <div className="mt-5">
          <ReleasePanel account={account} amount={releasable} />
        </div>
      </section>

      <StatGrid
        items={[
          { label: "Received", value: `${formatAmount(totalReceived)} ETH`, tone: "claimable" },
          { label: "Released", value: `${formatAmount(totalReleased)} ETH`, tone: "released" },
          { label: "My Share", value: myShares.toString(), tone: "ratio" },
          { label: "Payees", value: payeeCount, tone: "default" },
        ]}
      />

      <section className="rounded-[30px] bg-surface p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Payees</p>
            <h2 className="mt-1 text-lg font-semibold">Preview Strip</h2>
          </div>
          <Link
            href="/records"
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-text-primary"
          >
            View
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="mt-4">
          <PayeeStrip payees={(payees as `0x${string}`[] | undefined) ?? []} />
        </div>
      </section>
    </div>
  );
}
