# AnyApe - Gasless Cross-chain ApeCoin Payment Protocol

Additional Repositories: [AnyApe Smart Contracts](https://github.com/Nava-Labs/any-ape-contracts) | [AnyApe Subgraph](https://github.com/Nava-Labs/any-ape-subgraph)

## What is AnyApe?
AnyApe is an NFT Marketplace built during ETHOnline 2023 to showcase the capabilities of the payment protocol that allows users to enjoy a gasless and cross-chain web3 experience.

## The Problem
Bridges have been one of the most exploited protocols in the web3 space. This could hinder the adoption of the cross-chain idea, newcomers might be more reluctant to explore other chains. There's too much friction when it comes to bridging funds, first, you'd have to find the bridge that supports both source and destination chains, even when you do find one, you'll still have to make sure that the bridge supports the token you want to bridge. Not to mention liquidity, we're trying to abstract all of these steps by allowing projects to directly implement our protocol, giving their users a seamless experience.

## How Does It Work?
Here's how we achieve all of the features we offer:
1. **ApeCoin**: Utilized token available in the supported chains and act as the main multi-chain payment currency.
2. **Cometh's Account Abstraction SDK**: Allows users to create accounts across various supported chains. 
3. **Chainlink CCIP**: Allows users to pay from another chain when purchasing NFT on AnyApe seamlessly.
4. **The Graph**: For data indexing, such as listed NFTs. ([AnyApe Subgraph Repository](https://github.com/Nava-Labs/any-ape-subgraph))
5. **Filecoin**: NFTs metadata storage.

## How to Run?
To get AnyApe up and running, follow these simple steps:

### 1. First, run the development server:

```bash
npm run dev
```
or
```bash
yarn dev
```

### 2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
