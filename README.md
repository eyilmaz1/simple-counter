# TON Tolk Counter Contract (Testnet)

A minimal, fully working **counter smart contract** written in **Tolk** — successfully compiled, deployed, and verified on TON testnet using **Tolk 1.2.0** and Blueprint.

This is one of the rare public Tolk projects that actually **works** in 2025 — after surviving every breaking change in Tolk 1.2.0.

**Live contract on TON Testnet:**  
https://testnet.tonscan.org/address/EQB9P3PL73I2geJnUlX7tajbFlA37KW7M1Y4Hup2IXZ2vhvR

## Features
- Increment counter by any amount
- Reset counter to 0
- Safe getter (never throws exit_code 9)
- Storage properly initialized on deployment
- Mnemonic-based deployment (no TON Connect required)
- Clean, minimal code — perfect as a starter template

## Contract Address (Testnet)
kQBc5iJylS1jtxAZeONWMZD9LLaI827xnnWmyLhyKTEhr1lH

## Quick Interaction Commands

# Get current counter value
npx blueprint run getCounter --testnet --mnemonic

# Increment by 1
npx blueprint run increaseCounter --testnet --mnemonic

# Reset to 0
npx blueprint run resetCounter --testnet --mnemonic

## Project Structure
contracts/counter.tolk        ← Tolk smart contract
wrappers/Counter.ts           ← ton-core wrapper
scripts/
  deployCounter.ts
  getCounter.ts
  increaseCounter.ts
  resetCounter.ts

Setup & Run Locally
npm install
npx blueprint build Counter

## Deploy using your testnet wallet (add .env first)
npx blueprint run deployCounter --testnet --mnemonic

## Create .env in project root:
WALLET_MNEMONIC="your mnemonic words here"
WALLET_VERSION="v5r1"