import { clsx, type ClassValue } from "clsx";
import { formatEther } from "viem";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(value: bigint, digits = 4) {
  const numeric = Number.parseFloat(formatEther(value || 0n));

  if (!Number.isFinite(numeric)) {
    return "0";
  }

  if (numeric === 0) {
    return "0.0000";
  }

  return numeric.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  });
}

export function formatPercent(value: number) {
  return `${value.toFixed(value >= 10 ? 1 : 2)}%`;
}

export function formatAddress(address: `0x${string}` | string) {
  if (!address.startsWith("0x") || address.length < 10) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getShareStatus(releasable: bigint, released: bigint, shares: bigint) {
  if (shares === 0n) {
    return "Locked";
  }

  if (releasable > 0n) {
    return "Claimable";
  }

  if (released > 0n) {
    return "Released";
  }

  return "Pending";
}

export function getExplorerUrl(address: string) {
  return `https://basescan.org/address/${address}`;
}
