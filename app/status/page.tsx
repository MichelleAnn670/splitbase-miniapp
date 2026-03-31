import { Suspense } from "react";

import { ReleaseResultCard } from "@/components/release-result-card";

export default function StatusPage() {
  return (
    <div className="flex min-h-[calc(100vh-9rem)] items-center justify-center">
      <Suspense
        fallback={<div className="w-full rounded-[32px] bg-surface p-6 text-center shadow-panel">Loading status...</div>}
      >
        <ReleaseResultCard />
      </Suspense>
    </div>
  );
}
