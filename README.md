# splitbase-miniapp

SplitBase is a Base Mini App for onchain revenue splitting.

The app puts split status first, so payees can quickly review allocation ratios, release history, and claimable balances.

It supports real `release()` claims from the deployed contract on Base Mainnet.

## Repository

GitHub: https://github.com/MichelleAnn670/splitbase-miniapp.git

## Overview

SplitBase is designed as a simple interface for an existing revenue-splitting contract.

The main goal is to make the contract state easier to inspect and the claim flow easier to use.

Payees can open the app, review their split information, and submit a claim when funds are available for release.

## Features

- Base Mini App interface
- Split status displayed prominently
- Payee ratio inspection
- Release information display
- `release()` claim support
- Base Mainnet contract integration
- Farcaster metadata support
- RainbowKit and WalletConnect configuration through environment variables

## Network

This project targets Base Mainnet only.

Contract address:

`0xa128bd5452a5dd6e945927b12563c687794b0bfb`

## Requirements

Before running the project locally, install:

- Node.js
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/MichelleAnn670/splitbase-miniapp.git
cd splitbase-miniapp
```

Install dependencies:

```bash
npm install
```

## Environment Setup

Create a local environment file from the example file:

```bash
cp .env.example .env.local
```

Update `.env.local` with the required values:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME=SplitBase
```

### Environment Variables

`NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

WalletConnect project id used by RainbowKit.

`NEXT_PUBLIC_APP_URL`

The public app domain used for Mini App and Farcaster metadata.

`NEXT_PUBLIC_APP_NAME`

The public app name. The default value is:

```bash
SplitBase
```
