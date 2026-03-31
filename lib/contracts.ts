export const SPLIT_BASE_ADDRESS = "0xa128bd5452a5dd6e945927b12563c687794b0bfb" as const;

// Builder Code placeholder: bc_mgy7zx08
// Encoded attribution placeholder:
// 0x62635f6d6779377a7830380b0080218021802180218021802180218021
export const splitBaseAbi = [
  {
    type: "function",
    stateMutability: "view",
    name: "totalShares",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "totalReleased",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "totalReceived",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "shares",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "released",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "releasable",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    stateMutability: "view",
    name: "getPayees",
    inputs: [],
    outputs: [{ name: "", type: "address[]" }],
  },
  {
    type: "function",
    stateMutability: "nonpayable",
    name: "release",
    inputs: [],
    outputs: [],
  },
] as const;

export const splitBaseContract = {
  address: SPLIT_BASE_ADDRESS,
  abi: splitBaseAbi,
} as const;
