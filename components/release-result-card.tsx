"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, CircleSlash2, Clock3 } from "lucide-react";
import { useWaitForTransactionReceipt } from "wagmi";

import { StatusPill } from "@/components/status-pill";
import { formatAddress, formatAmount } from "@/lib/utils";

const kindMap = {
  success: {
    title: "Released",
    icon: CheckCircle2,
    status: "Released",
    tone: "text-primary",
  },
  empty: {
    title: "Nothing to release",
    icon: CircleSlash2,
    status: "Locked",
    tone: "text-slate-500",
  },
  error: {
    title: "Release failed",
    icon: AlertTriangle,
    status: "Error",
    tone: "text-danger",
  },
  pending: {
    title: "Pending",
    icon: Clock3,
    status: "Pending",
    tone: "text-warning",
  },
} as const;

export function ReleaseResultCard() {
  const searchParams = useSearchParams();
  const kind = (searchParams.get("kind") || "pending") as keyof typeof kindMap;
  const amount = BigInt(searchParams.get("amount") || "0");
  const address = searchParams.get("address") || "0x0000000000000000000000000000000000000000";
  const hash = searchParams.get("hash") as `0x${string}` | null;
  const reason = searchParams.get("reason");
  const item = kindMap[kind] ?? kindMap.pending;
  const Icon = item.icon;

  const receipt = useWaitForTransactionReceipt({
    hash: hash ?? undefined,
    query: {
      enabled: kind === "pending" && Boolean(hash),
      refetchInterval: 3000,
    },
  });

  useEffect(() => {
    if (kind === "pending" && receipt.isSuccess && receipt.data?.status === "success") {
      window.location.replace(`/status?kind=success&hash=${hash}&address=${address}&amount=${amount.toString()}`);
    }

    if (kind === "pending" && receipt.isError) {
      window.location.replace(`/status?kind=error&address=${address}&reason=${encodeURIComponent("Transaction failed")}&amount=0`);
    }
  }, [address, amount, hash, kind, receipt.data?.status, receipt.isError, receipt.isSuccess]);

  return (
    <section className="w-full rounded-[32px] bg-surface p-6 text-center shadow-panel">
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 ${item.tone}`}>
        <Icon size={28} />
      </div>

      <div className="mt-5 flex justify-center">
        <StatusPill status={item.status} />
      </div>

      <h1 className="mt-4 text-2xl font-semibold">{item.title}</h1>
      <p className={`mt-3 text-4xl font-semibold ${item.tone}`}>{formatAmount(amount)} ETH</p>
      <p className="mt-2 font-mono text-sm text-text-secondary">{formatAddress(address as `0x${string}`)}</p>

      {hash ? (
        <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-left">
          <p className="text-xs text-text-secondary">Tx</p>
          <p className="mt-2 break-all font-mono text-sm text-text-primary">{hash}</p>
        </div>
      ) : null}

      {reason ? (
        <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-left">
          <p className="text-xs text-text-secondary">Reason</p>
          <p className="mt-2 text-sm text-text-primary">{decodeURIComponent(reason)}</p>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/" className="rounded-full bg-primary px-4 py-3 text-sm font-medium text-white">
          Back
        </Link>
        <Link href="/records" className="rounded-full bg-slate-100 px-4 py-3 text-sm font-medium text-text-primary">
          Open
        </Link>
      </div>
    </section>
  );
}
