"use client";

import { useMemo, useState } from "react";
import { Layers2, ListFilter } from "lucide-react";
import { useReadContract, useReadContracts } from "wagmi";

import { PayeeCard } from "@/components/payee-card";
import { splitBaseContract } from "@/lib/contracts";
import { formatAmount, getShareStatus } from "@/lib/utils";

type FilterKey = "Payees" | "Released" | "All";

const filters: FilterKey[] = ["Payees", "Released", "All"];

export function RecordsFeed() {
  const [filter, setFilter] = useState<FilterKey>("All");

  const { data: payees } = useReadContract({
    ...splitBaseContract,
    functionName: "getPayees",
  });

  const payeeList = (payees as `0x${string}`[] | undefined) ?? [];

  const { data: totalSharesResult } = useReadContract({
    ...splitBaseContract,
    functionName: "totalShares",
  });

  const totalShares = totalSharesResult ?? 0n;

  const { data: rows } = useReadContracts({
    contracts: payeeList.flatMap((address) => [
      { ...splitBaseContract, functionName: "shares", args: [address] as const },
      { ...splitBaseContract, functionName: "released", args: [address] as const },
      { ...splitBaseContract, functionName: "releasable", args: [address] as const },
    ]),
    query: {
      enabled: payeeList.length > 0,
    },
  });

  const items = useMemo(() => {
    return payeeList.map((address, index) => {
      const shares = (rows?.[index * 3]?.result as bigint | undefined) ?? 0n;
      const released = (rows?.[index * 3 + 1]?.result as bigint | undefined) ?? 0n;
      const releasable = (rows?.[index * 3 + 2]?.result as bigint | undefined) ?? 0n;
      const ratio = totalShares > 0n ? Number((shares * 10000n) / totalShares) / 100 : 0;
      const status = getShareStatus(releasable, released, shares);

      return { address, shares, released, releasable, ratio, status };
    });
  }, [payeeList, rows, totalShares]);

  const visibleItems = useMemo(() => {
    if (filter === "Payees") {
      return items.filter((item) => item.shares > 0n);
    }

    if (filter === "Released") {
      return items.filter((item) => item.released > 0n);
    }

    return items;
  }, [filter, items]);

  const totalClaimable = visibleItems.reduce((sum, item) => sum + item.releasable, 0n);

  return (
    <div className="space-y-4">
      <section className="rounded-[30px] bg-surface p-5 shadow-panel">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Records</p>
            <h1 className="mt-1 text-2xl font-semibold">Split Feed</h1>
          </div>
          <div className="rounded-2xl bg-slate-100 p-3 text-primary">
            <Layers2 size={20} />
          </div>
        </div>

        <div className="mt-5 rounded-[28px] bg-slate-50 p-2">
          <div className="grid grid-cols-3 gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-[20px] px-3 py-3 text-sm font-medium transition ${filter === item ? "bg-white text-primary shadow-sm" : "text-text-secondary"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Visible</p>
            <p className="mt-2 text-2xl font-semibold">{visibleItems.length}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Claimable</p>
            <p className="mt-2 text-lg font-semibold text-success">{formatAmount(totalClaimable)}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs text-text-secondary">Filter</p>
            <p className="mt-2 text-lg font-semibold">{filter}</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1 text-sm text-text-secondary">
          <ListFilter size={16} />
          Ratio and payout aligned
        </div>
        {visibleItems.map((item) => (
          <PayeeCard key={item.address} {...item} />
        ))}
      </section>
    </div>
  );
}
