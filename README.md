# SplitBase

SplitBase is a Base Mini App for onchain revenue splitting. It shows split status first, lets any payee inspect ratios and releases, and supports real `release()` claims from the deployed contract.

## Install

```bash
npm install
```

## Local Run

```bash
npm run dev
```

## Environment Variables

Create `.env.local` from `.env.example`.

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=` WalletConnect project id for RainbowKit
- `NEXT_PUBLIC_APP_URL=` public app domain, used by Farcaster metadata placeholders
- `NEXT_PUBLIC_APP_NAME=SplitBase`

## Build

```bash
npm run build
```

## Vercel Deploy

```bash
vercel
vercel --prod
```

## Base Mini App Metadata

- App metadata lives in [app/layout.tsx](/c:/baseminiapp/A139/app/layout.tsx)
- Farcaster manifest lives in [public/.well-known/farcaster.json](/c:/baseminiapp/A139/public/.well-known/farcaster.json)
- Builder code placeholder notes are kept in [README.md](/c:/baseminiapp/A139/README.md) and [lib/contracts.ts](/c:/baseminiapp/A139/lib/contracts.ts)

## Replace Domain In Farcaster

Update `NEXT_PUBLIC_APP_URL` and replace the placeholder URLs in [public/.well-known/farcaster.json](/c:/baseminiapp/A139/public/.well-known/farcaster.json) with the final deployed domain.

## Notes

- Network target: Base Mainnet only
- Contract: `0xa128bd5452a5dd6e945927b12563c687794b0bfb`
- Builder Code: `bc_mgy7zx08`
- Encoded String: `0x62635f6d6779377a7830380b0080218021802180218021802180218021`
- If you extend attribution later, keep it additive and avoid changing the deployed contract integration path
