"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ChartNoAxesColumn, LayoutGrid, WalletCards } from "lucide-react";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Dashboard", icon: LayoutGrid },
  { href: "/records", label: "Records", icon: ChartNoAxesColumn },
  { href: "/status", label: "Status", icon: Activity },
  { href: "/me", label: "Me", icon: WalletCards },
];

export function BottomTab() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 pb-4">
      <div className="grid grid-cols-4 rounded-[28px] border border-white/80 bg-white/90 p-2 shadow-panel backdrop-blur">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active =
            tab.href === "/" ? pathname === tab.href : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-[20px] px-2 py-3 text-[11px] font-medium transition",
                active ? "bg-primary text-white" : "text-text-secondary",
              )}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
