"use client";

import { useRouter } from "next/navigation";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { BaseError } from "viem";
import { useAccount, useWriteContract } from "wagmi";

import { splitBaseContract } from "@/lib/contracts";
import { cn, formatAmount } from "@/lib/utils";

type ReleasePanelProps = {
  account: `0x${string}`;
  amount: bigint;
  compact?: boolean;
};

export function ReleasePanel({ account, amount, compact = false }: ReleasePanelProps) {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { isPending, writeContractAsync } = useWriteContract();

  const handleRelease = async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (amount <= 0n) {
      router.push(`/status?kind=empty&address=${account}&amount=0`);
      return;
    }

    try {
      const hash = await writeContractAsync({
        ...splitBaseContract,
        functionName: "release",
      });

      router.push(`/status?kind=pending&hash=${hash}&address=${account}&amount=${amount.toString()}`);
    } catch (error) {
      const reason = error instanceof BaseError ? error.shortMessage || error.message : "Release failed";
      router.push(`/status?kind=error&address=${account}&reason=${encodeURIComponent(reason)}&amount=0`);
    }
  };

  return (
    <div
      className={cn(
        "rounded-[28px] border border-slate-200 bg-white p-4",
        compact ? "space-y-3" : "flex items-center justify-between gap-4",
      )}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Release</p>
        <p className="mt-2 text-lg font-semibold text-text-primary">{formatAmount(amount)} ETH</p>
        <p className="mt-1 text-sm text-text-secondary">
          {isPending ? "Waiting for wallet or chain" : "Claim to your payee address"}
        </p>
      </div>

      <button
        type="button"
        onClick={handleRelease}
        disabled={isPending}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition",
          isPending ? "bg-slate-200 text-slate-500" : "bg-success text-white",
          compact ? "w-full" : "min-w-[132px]",
        )}
      >
        {isPending ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
        {isPending ? "Pending" : "Release"}
      </button>
    </div>
  );
}
